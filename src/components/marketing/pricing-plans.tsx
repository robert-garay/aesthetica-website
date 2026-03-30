'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type BillingCycle = 'monthly' | 'annually'

const studentFeatures = [
  'Full access to Basic Esthetics course',
  'Automatic hour tracking',
  'DPOR-ready report export',
  'AI tutor (Lumina)',
  'Quiz and assessment engine',
  'Discussion forums',
  'Cancel anytime',
]

const starterFeatures = [
  'Everything in Student',
  'Instructor dashboard',
  'Gradebook',
  'Hour verification',
  'DPOR bulk export',
  'Priority support',
]

const growthFeatures = ['Everything in Starter', 'White label', 'API access', 'Dedicated onboarding']

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  const studentPrice = useMemo(
    () =>
      billingCycle === 'monthly'
        ? { value: '$29', unit: '/ month', note: null }
        : { value: '$199', unit: '/ year', note: '~$16.60/mo — save 40%' },
    [billingCycle]
  )

  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-3">
        <div className="inline-flex rounded-full bg-[#F5F5F7] p-1">
          <button
            type="button"
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              billingCycle === 'monthly' ? 'bg-[#3D1A4B] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            )}
            onClick={() => setBillingCycle('monthly')}
            aria-pressed={billingCycle === 'monthly'}
          >
            Monthly
          </button>
          <button
            type="button"
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              billingCycle === 'annually' ? 'bg-[#3D1A4B] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            )}
            onClick={() => setBillingCycle('annually')}
            aria-pressed={billingCycle === 'annually'}
          >
            Annually
          </button>
        </div>
        <span className="rounded-full bg-[#C4748A]/15 px-3 py-1 text-xs font-medium text-[#C4748A]">Save 40%</span>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-4 lg:grid-cols-3">
        <article className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#6E6E73] uppercase">Student</p>
          <div className="mt-4 flex items-end gap-2">
            <p className="text-5xl font-semibold tracking-tight text-[#1D1D1F]">{studentPrice.value}</p>
            <p className="pb-1 text-sm text-[#6E6E73]">{studentPrice.unit}</p>
          </div>
          <p className="mt-2 min-h-5 text-sm text-[#6E6E73]">{studentPrice.note ?? ''}</p>
          <p className="mt-3 text-[15px] text-[#6E6E73]">For independent learners enrolling directly.</p>

          <ul className="mt-6 space-y-3 text-sm text-[#1D1D1F]">
            {studentFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#7A9E8A]" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#3D1A4B] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </article>

        <article className="relative rounded-3xl border-2 border-[#3D1A4B] bg-white p-8 shadow-lg lg:scale-[1.02]">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C4748A] px-3 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>
          <p className="text-xs font-semibold tracking-[0.08em] text-[#6E6E73] uppercase">School — Starter</p>
          <div className="mt-4 flex items-end gap-2">
            <p className="text-5xl font-semibold tracking-tight text-[#1D1D1F]">$49</p>
            <p className="pb-1 text-sm text-[#6E6E73]">/ student/year</p>
          </div>
          <p className="mt-5 text-[15px] text-[#6E6E73]">For schools with up to 50 students.</p>

          <ul className="mt-6 space-y-3 text-sm text-[#1D1D1F]">
            {starterFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#7A9E8A]" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#3D1A4B] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Contact Sales
          </Link>
        </article>

        <article className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#6E6E73] uppercase">School — Growth</p>
          <div className="mt-4 flex items-end gap-2">
            <p className="text-5xl font-semibold tracking-tight text-[#1D1D1F]">$39</p>
            <p className="pb-1 text-sm text-[#6E6E73]">/ student/year</p>
          </div>
          <p className="mt-5 text-[15px] text-[#6E6E73]">For growing schools.</p>

          <ul className="mt-6 space-y-3 text-sm text-[#1D1D1F]">
            {growthFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#7A9E8A]" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#3D1A4B] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Contact Sales
          </Link>
        </article>
      </div>

      <div className="mx-auto mt-16 max-w-5xl rounded-3xl bg-[#F5F5F7] p-8 text-center shadow-sm">
        <h3 className="text-2xl font-semibold tracking-tight text-[#1D1D1F]">Continuing Education</h3>
        <p className="mx-auto mt-3 max-w-2xl text-[17px] text-[#6E6E73]">
          Licensed estheticians: access individual CE courses for license renewal.
        </p>
        <p className="mt-3 text-[15px] font-medium text-[#1D1D1F]">$19–$49 per course · $99/yr unlimited CE pass</p>
        <Link href="#" className="mt-5 inline-flex text-[15px] font-medium text-[#3D1A4B] hover:opacity-80">
          Browse CE Courses →
        </Link>
      </div>
    </>
  )
}
