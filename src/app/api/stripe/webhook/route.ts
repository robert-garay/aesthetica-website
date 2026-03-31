import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  // Idempotency — record event, skip if already processed
  const existing = await prisma.webhookEvent.findUnique({
    where: { provider_externalEventId: { provider: 'STRIPE', externalEventId: event.id } },
  })
  if (existing?.status === 'PROCESSED') {
    return NextResponse.json({ received: true, skipped: true })
  }

  // Upsert event record
  await prisma.webhookEvent.upsert({
    where: { provider_externalEventId: { provider: 'STRIPE', externalEventId: event.id } },
    create: {
      provider: 'STRIPE',
      externalEventId: event.id,
      signatureValid: true,
      status: 'RECEIVED',
      payload: event as object,
    },
    update: { status: 'RECEIVED' },
  })

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        await handleSubscriptionUpsert(sub)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: 'CANCELED', canceledAt: new Date() },
        })
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subId = invoice.parent?.type === 'subscription_details'
          ? invoice.parent.subscription_details?.subscription
          : null
        if (subId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subId as string },
            data: { status: 'PAST_DUE' },
          })
        }
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      default:
        break
    }

    // Mark processed
    await prisma.webhookEvent.updateMany({
      where: { provider: 'STRIPE', externalEventId: event.id },
      data: { status: 'PROCESSED', processedAt: new Date() },
    })

    return NextResponse.json({ received: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook processing error:', message)
    await prisma.webhookEvent.updateMany({
      where: { provider: 'STRIPE', externalEventId: event.id },
      data: { status: 'FAILED', errorMessage: message },
    })
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

async function handleSubscriptionUpsert(sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price.id
  const interval = sub.items.data[0]?.price.recurring?.interval === 'month' ? 'MONTH' : 'YEAR'

  // Find user or school by Stripe customer ID
  const user = await prisma.user.findFirst({
    where: {
      subscriptions: { some: { stripeCustomerId: sub.customer as string } },
    },
  })

  // In Stripe v21, period dates are on the subscription item billing thresholds
  // Use start_date and billing_cycle_anchor as proxies
  const periodStart = new Date(sub.start_date * 1000)
  const periodEnd = sub.cancel_at
    ? new Date(sub.cancel_at * 1000)
    : new Date((sub.billing_cycle_anchor + 31536000) * 1000) // +1 year fallback

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      userId: user?.id,
      stripeCustomerId: sub.customer as string,
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId ?? '',
      status: mapSubStatus(sub.status),
      interval,
      quantity: sub.items.data[0]?.quantity ?? 1,
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      status: mapSubStatus(sub.status),
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
    },
  })
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Derive tax as total - subtotal (Stripe v21 removed top-level `tax` field)
  const taxAmount = Math.max(0, invoice.total - invoice.subtotal)

  await prisma.invoice.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      stripeInvoiceId: invoice.id,
      number: invoice.number ?? null,
      status: 'PAID',
      subtotal: invoice.subtotal / 100,
      tax: taxAmount / 100,
      total: invoice.total / 100,
      currency: invoice.currency,
      invoicePdfUrl: invoice.invoice_pdf ?? null,
      hostedInvoiceUrl: invoice.hosted_invoice_url ?? null,
      paidAt: invoice.status_transitions?.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000)
        : new Date(),
    },
    update: {
      status: 'PAID',
      paidAt: invoice.status_transitions?.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000)
        : new Date(),
    },
  })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Checkout metadata should include userId set during session creation
  const userId = session.metadata?.userId
  if (!userId || !session.subscription) return

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: session.subscription as string },
    data: { userId },
  })
}

function mapSubStatus(status: Stripe.Subscription.Status) {
  const map: Record<Stripe.Subscription.Status, 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE' | 'INCOMPLETE_EXPIRED' | 'UNPAID'> = {
    trialing:           'TRIALING',
    active:             'ACTIVE',
    past_due:           'PAST_DUE',
    canceled:           'CANCELED',
    incomplete:         'INCOMPLETE',
    incomplete_expired: 'INCOMPLETE_EXPIRED',
    unpaid:             'UNPAID',
    paused:             'ACTIVE',
  }
  return map[status] ?? 'ACTIVE'
}
