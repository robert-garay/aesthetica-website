import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart2, BookOpen, Clock, Shield, Users } from 'lucide-react'
import { AnimateIn } from '@/components/shared/animate-in'

export const metadata: Metadata = {
  title: 'For Schools · Aesthetica',
  description:
    'Modern esthetics learning infrastructure for Virginia schools, with hour tracking, instructor tools, and DPOR-ready reporting.',
}

const trustedSchools = ['Belle Academy', 'Virginia Esthetics Institute', 'Capitol Beauty School', 'NoVA Aesthetics']

export default function SchoolsPage() {
  return (
    <main className="bg-[#FBFBFD] text-[#1D1D1F]">
      <section className="bg-[#1D1D1F] px-5 py-40 text-center text-white">
        <AnimateIn className="mx-auto max-w-4xl" delay={90}>
          <p className="text-xs font-medium tracking-[0.08em] text-white/50 uppercase">For Schools & Institutions</p>
          <h1 className="font-display mt-6 text-[52px] leading-none font-light tracking-[-0.02em] md:text-[80px]">
            Your students. Our platform.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-relaxed text-white/60">
            Give your esthetics program the modern learning platform it deserves — built for Virginia compliance
            from day one.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#"
              className="rounded-full bg-white px-6 py-3 text-[17px] font-medium text-[#3D1A4B] transition-opacity hover:opacity-90"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/20 px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </AnimateIn>
      </section>

      <section className="bg-white px-5 py-12">
        <AnimateIn className="mx-auto max-w-6xl text-center" delay={70}>
          <p className="text-[13px] text-[#6E6E73]">Trusted by Virginia esthetics programs</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {trustedSchools.map((school) => (
              <span key={school} className="rounded-full bg-[#F5F5F7] px-4 py-1.5 text-sm text-[#6E6E73]">
                {school}
              </span>
            ))}
          </div>
        </AnimateIn>
      </section>

      <section className="bg-white px-5 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <AnimateIn delay={90}>
            <div className="rounded-3xl bg-[#1D1D1F] p-7 text-white shadow-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-white/60">
                <p className="inline-flex items-center gap-2">
                  <Clock className="size-4" aria-hidden="true" />
                  Student Hour Log
                </p>
                <p>428 / 600 hrs</p>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-3">Theory Module 14 · 1.5 hours · Verified</div>
                <div className="rounded-2xl bg-white/10 p-3">Anatomy Review · 2.0 hours · Verified</div>
                <div className="rounded-2xl bg-white/10 p-3">Sanitation Quiz · 1.0 hours · Pending review</div>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={130}>
            <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">DPOR Compliance</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1D1D1F] md:text-[40px]">
              Stop worrying about audit trails.
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#6E6E73]">
              Every student session is logged automatically. Instructor verification takes seconds, not hours.
              Generate DPOR-formatted reports for any student, any time.
            </p>
            <Link href="#" className="mt-6 inline-flex text-[15px] font-medium text-[#3D1A4B] hover:opacity-80">
              See how it works →
            </Link>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-[#FBFBFD] px-5 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <AnimateIn delay={90}>
            <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">Instructor Tools</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1D1D1F] md:text-[40px]">
              See every student at a glance.
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#6E6E73]">
              Know who&apos;s on track and who needs attention before they fall behind. At-risk alerts, grade book,
              and hour verification — all in one place.
            </p>
          </AnimateIn>

          <AnimateIn delay={130}>
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#D2D2D7] pb-4">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F]">
                  <Users className="size-4 text-[#3D1A4B]" aria-hidden="true" />
                  Cohort Roster
                </p>
                <p className="inline-flex items-center gap-2 text-xs text-[#6E6E73]">
                  <BarChart2 className="size-4" aria-hidden="true" />
                  78 active students
                </p>
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#1D1D1F]">
                <div className="flex items-center justify-between rounded-2xl bg-[#F5F5F7] px-4 py-3">
                  <span>Amaya R.</span>
                  <span className="text-[#6E6E73]">On track</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#F5F5F7] px-4 py-3">
                  <span>Jordan M.</span>
                  <span className="text-[#C4748A]">At risk</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#F5F5F7] px-4 py-3">
                  <span>Riley K.</span>
                  <span className="text-[#6E6E73]">Needs hour verification</span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-[#F5F5F7] px-5 py-24 md:py-32">
        <AnimateIn className="mx-auto max-w-5xl text-center" delay={90}>
          <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">Simple pricing</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1D1D1F] md:text-5xl">
            No per-feature fees. Just seats.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <Shield className="mx-auto size-5 text-[#3D1A4B]" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold">$49</p>
              <p className="mt-1 text-sm text-[#6E6E73]">student/yr Starter</p>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <Users className="mx-auto size-5 text-[#3D1A4B]" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold">$39</p>
              <p className="mt-1 text-sm text-[#6E6E73]">student/yr Growth</p>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <BookOpen className="mx-auto size-5 text-[#3D1A4B]" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold">$29</p>
              <p className="mt-1 text-sm text-[#6E6E73]">student/yr Enterprise</p>
            </div>
          </div>
        </AnimateIn>
      </section>

      <section className="bg-[#1D1D1F] px-5 py-32 text-center text-white">
        <AnimateIn className="mx-auto max-w-3xl" delay={90}>
          <h2 className="font-display text-[46px] leading-none font-light tracking-[-0.02em] md:text-[64px]">
            Ready to modernize your program?
          </h2>
          <Link
            href="#"
            className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-[17px] font-medium text-[#3D1A4B] transition-opacity hover:opacity-90"
          >
            Schedule a Demo
          </Link>
        </AnimateIn>
      </section>
    </main>
  )
}
