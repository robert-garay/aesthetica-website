'use server'

import { auth } from '@/lib/auth'
import { stripe, PRICE_IDS, type PlanKey } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

// ─── Create Checkout Session ──────────────────────────────────────────────────

export async function createCheckoutSession(plan: PlanKey) {
  const session = await auth()
  if (!session?.user?.id) redirect('/sign-in')

  const user = session.user
  const priceId = PRICE_IDS[plan]

  // Get or create Stripe customer
  let stripeCustomerId: string | undefined

  const existingSub = await prisma.subscription.findFirst({
    where: { userId: user.id },
    select: { stripeCustomerId: true },
  })

  if (existingSub?.stripeCustomerId) {
    stripeCustomerId = existingSub.stripeCustomerId
  } else {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name ?? undefined,
      metadata: { userId: user.id },
    })
    stripeCustomerId = customer.id
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?checkout=cancelled`,
    metadata: { userId: user.id, plan },
    subscription_data: {
      metadata: { userId: user.id, plan },
      trial_period_days: 7,
    },
    allow_promotion_codes: true,
  })

  if (!checkoutSession.url) throw new Error('Failed to create checkout session')

  redirect(checkoutSession.url)
}

// ─── Create Customer Portal Session ──────────────────────────────────────────

export async function createBillingPortalSession() {
  const session = await auth()
  if (!session?.user?.id) redirect('/sign-in')

  const sub = await prisma.subscription.findFirst({
    where: { userId: session.user.id },
    select: { stripeCustomerId: true },
  })

  if (!sub?.stripeCustomerId) {
    redirect('/pricing')
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/billing`,
  })

  redirect(portalSession.url)
}

// ─── Get Subscription Status ──────────────────────────────────────────────────

export async function getSubscriptionStatus() {
  const session = await auth()
  if (!session?.user?.id) return null

  return prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      status: { in: ['ACTIVE', 'TRIALING'] },
    },
    select: {
      status: true,
      stripePriceId: true,
      currentPeriodEnd: true,
      cancelAtPeriodEnd: true,
      interval: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}
