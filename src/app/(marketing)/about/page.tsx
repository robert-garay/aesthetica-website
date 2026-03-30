import type { Metadata } from 'next'
import { BarChart2, BookOpen, CheckCircle2, Clock, Shield, Users } from 'lucide-react'
import { AnimateIn } from '@/components/shared/animate-in'

export const metadata: Metadata = {
  title: 'About · Aesthetica',
  description:
    'Aesthetica is reimagining esthetics education for modern learners with mobile-first tools, transparent progress tracking, and Virginia-ready compliance.',
}

const values = [
  {
    title: 'Students first',
    body: 'Every feature is designed for the learner, not the institution.',
    icon: Users,
  },
  {
    title: 'Radical transparency',
    body: 'Your hours are yours. Export them anytime, no gatekeeping.',
    icon: CheckCircle2,
  },
  {
    title: 'Mobile-native',
    body: 'Designed for phones first. Laptops second.',
    icon: Clock,
  },
  {
    title: 'Compliance without friction',
    body: 'Virginia DPOR requirements are built in, not bolted on.',
    icon: Shield,
  },
  {
    title: 'AI that helps, not hypes',
    body: 'Our AI tutor is grounded in your course content. No hallucinations.',
    icon: BarChart2,
  },
  {
    title: 'Honest pricing',
    body: 'No hidden fees. No sales calls required. Prices on the website.',
    icon: BookOpen,
  },
]

export default function AboutPage() {
  return (
    <main className="bg-[#FBFBFD] text-[#1D1D1F]">
      <section className="bg-[#F5F5F7] px-5 py-40 text-center">
        <AnimateIn className="mx-auto max-w-4xl" delay={80}>
          <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">Our mission</p>
          <h1 className="font-display mt-6 text-[52px] leading-none font-light tracking-[-0.02em] md:text-[80px]">
            Education that moves with you.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[19px] leading-relaxed text-[#6E6E73]">
            Aesthetica was built for the generation of estheticians who learn on their phones, study between
            shifts, and expect their tools to just work.
          </p>
        </AnimateIn>
      </section>

      <section className="bg-white px-5 py-24 md:py-32">
        <AnimateIn className="mx-auto max-w-2xl text-center" delay={90}>
          <blockquote className="font-display text-[32px] leading-tight text-[#1D1D1F] italic">
            &ldquo;Beauty education hasn&apos;t kept up with the people who love it. We&apos;re changing that.&rdquo;
          </blockquote>
          <p className="mt-8 text-[17px] leading-relaxed text-[#6E6E73]">
            Virginia requires 600 hours of theory training for a basic esthetics license. For years, students have
            been stuck with clunky desktop software designed in the 2000s. Aesthetica is built for 2026 —
            mobile-first, AI-assisted, and built around the way modern students actually learn.
          </p>
        </AnimateIn>
      </section>

      <section className="bg-[#F5F5F7] px-5 py-24 md:py-32">
        <AnimateIn className="mx-auto max-w-6xl" delay={80}>
          <p className="text-center text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">What we believe</p>
          <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight text-[#1D1D1F] md:text-[48px]">
            Built on principles.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <article key={value.title} className="rounded-3xl bg-white p-8 shadow-sm">
                  <Icon className="size-5 text-[#3D1A4B]" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold text-[#1D1D1F]">{value.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6E6E73]">{value.body}</p>
                </article>
              )
            })}
          </div>
        </AnimateIn>
      </section>

      <section className="bg-[#1D1D1F] px-5 py-24 text-center text-white md:py-32">
        <AnimateIn className="mx-auto max-w-3xl" delay={90}>
          <h2 className="font-display text-[46px] leading-none font-light tracking-[-0.02em] md:text-[64px]">
            Join the waitlist.
          </h2>

          <form className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row" action="#" method="post">
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full border border-white/20 bg-white px-5 text-[15px] text-[#1D1D1F] placeholder:text-[#6E6E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-[#3D1A4B] px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Notify me
            </button>
          </form>

          <p className="mt-4 text-sm text-white/50">We&apos;re launching soon. Be first to know.</p>
        </AnimateIn>
      </section>
    </main>
  )
}
