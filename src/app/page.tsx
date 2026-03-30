import Link from 'next/link'
import { BarChart2, CheckSquare, ChevronDown, Clock, Play, Shield } from 'lucide-react'
import { MarketingFooter } from '@/components/marketing/footer'
import { MarketingNav } from '@/components/marketing/nav'
import { AnimateIn } from '@/components/shared/animate-in'

const stats = [
  { value: '600', label: 'Required theory hours' },
  { value: '2', label: 'Courses at launch' },
  { value: 'VA', label: 'DPOR qualified' },
  { value: '100%', label: 'Online — your pace' },
]

const steps = [
  {
    number: '01',
    title: 'Enroll',
    body: 'Sign up directly or through your school.',
  },
  {
    number: '02',
    title: 'Complete your theory',
    body: '600 hours of video, reading, and quizzes — all tracked automatically.',
  },
  {
    number: '03',
    title: 'Get your report',
    body: 'Download your DPOR-ready hour report and walk into your practical exam ready.',
  },
]

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#1D1D1F] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <MarketingNav />

      <main id="main-content" className="bg-[#FBFBFD] text-[#1D1D1F]">
        <section className="relative flex min-h-screen items-center justify-center px-5 pt-24 pb-14">
          <AnimateIn className="mx-auto max-w-3xl text-center" delay={100}>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#6E6E73]">
              Virginia State-Qualified • DPOR Compliant
            </p>
            <h1 className="font-display mt-6 text-[56px] leading-none font-light tracking-[-0.02em] text-[#1D1D1F] md:text-[80px] lg:text-[96px]">
              Learn to glow.
            </h1>
            <p className="mx-auto mt-6 max-w-[480px] text-[17px] leading-relaxed text-[#6E6E73] md:text-[21px]">
              Complete your 600-hour esthetics theory requirement — online, at your pace.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#"
                className="rounded-full bg-[#3D1A4B] px-6 py-3 text-[17px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-black/20 px-6 py-3 text-[17px] font-medium text-[#1D1D1F] transition-colors hover:bg-black/5"
              >
                Learn more ↓
              </Link>
            </div>
          </AnimateIn>

          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[#6E6E73] motion-reduce:animate-none animate-bounce">
            <ChevronDown className="size-5" aria-hidden="true" />
            <span className="sr-only">Scroll down</span>
          </div>
        </section>

        <section className="border-y border-black/6 bg-white py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-7 px-5 md:flex-row md:gap-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center">
                <AnimateIn className="text-center" delay={index * 80}>
                  <p className="font-display text-5xl font-normal text-[#1D1D1F]">{stat.value}</p>
                  <p className="mt-1 text-[13px] text-[#6E6E73]">{stat.label}</p>
                </AnimateIn>
                {index < stats.length - 1 && <div className="mx-6 hidden h-10 w-px bg-[#D2D2D7] md:block" />}
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="bg-[#F5F5F7] px-5 py-24 md:py-32">
          <AnimateIn className="mx-auto mb-16 max-w-2xl text-center" delay={80}>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#6E6E73]">What you get</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1D1D1F] md:text-5xl">
              Built for how you actually learn.
            </h2>
          </AnimateIn>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
            <AnimateIn className="rounded-3xl bg-[#1D1D1F] p-8 text-white shadow-sm md:col-span-2 lg:col-span-7" delay={90}>
              <Clock className="size-6 text-white/60" aria-hidden="true" />
              <h3 className="mt-5 text-[28px] font-semibold">Track every hour.</h3>
              <p className="mt-3 max-w-[320px] text-[15px] text-white/60">
                Automatic hour tracking tied to every lesson. Export your DPOR-ready report in one click.
              </p>
              <div className="mt-8 rounded-2xl bg-white/10 p-4">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Hours completed</span>
                  <span>428 / 600</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/15">
                  <div className="h-full w-[71%] rounded-full bg-white/80" />
                </div>
              </div>
            </AnimateIn>

            <AnimateIn className="rounded-3xl bg-white p-8 text-[#1D1D1F] shadow-sm lg:col-span-5" delay={130}>
              <Play className="size-5 text-[#3D1A4B]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">Learn at your pace.</h3>
              <p className="mt-2 text-[14px] text-[#6E6E73]">
                Video lessons, reading, and quizzes — all on your schedule.
              </p>
            </AnimateIn>

            <AnimateIn className="rounded-3xl bg-white p-8 text-[#1D1D1F] shadow-sm lg:col-span-4" delay={160}>
              <BarChart2 className="size-5 text-[#3D1A4B]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">Know your score.</h3>
              <p className="mt-2 text-[14px] text-[#6E6E73]">
                Every quiz updates your progress so you always know where to focus.
              </p>
            </AnimateIn>

            <AnimateIn className="relative overflow-hidden rounded-3xl bg-[#1D1D1F] p-8 text-white shadow-sm lg:col-span-4" delay={190}>
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#3D1A4B]/60 blur-2xl" aria-hidden="true" />
              <h3 className="relative z-10 text-2xl font-semibold">AI Tutor.</h3>
              <p className="relative z-10 mt-3 text-[15px] text-white/70">
                Ask anything. Get answers grounded in your course.
              </p>
            </AnimateIn>

            <AnimateIn className="rounded-3xl bg-white p-8 text-[#1D1D1F] shadow-sm lg:col-span-4" delay={220}>
              <CheckSquare className="size-5 text-[#3D1A4B]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">Skills tracker.</h3>
              <p className="mt-2 text-[14px] text-[#6E6E73]">
                Keep practical skills organized with clear checklists tied to your progress.
              </p>
            </AnimateIn>

            <AnimateIn
              id="schools"
              className="rounded-3xl bg-white p-8 text-[#1D1D1F] shadow-sm md:col-span-2 lg:col-span-6"
              delay={250}
            >
              <h3 className="text-2xl font-semibold">For schools too.</h3>
              <p className="mt-3 max-w-md text-[15px] text-[#6E6E73]">
                Manage your entire cohort from one dashboard.
              </p>
              <div className="mt-7 rounded-2xl bg-[#F5F5F7] p-4">
                <div className="grid grid-cols-3 gap-3 text-[13px]">
                  <div className="rounded-xl bg-white p-3 text-center text-[#6E6E73]">Attendance</div>
                  <div className="rounded-xl bg-white p-3 text-center text-[#6E6E73]">Hours</div>
                  <div className="rounded-xl bg-white p-3 text-center text-[#6E6E73]">Scores</div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn className="rounded-3xl bg-[#1D1D1F] p-8 text-white shadow-sm md:col-span-2 lg:col-span-6" delay={280}>
              <Shield className="size-6 text-white/70" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-semibold">DPOR compliant.</h3>
              <p className="mt-3 max-w-md text-[15px] text-white/65">
                Built for Virginia state requirements with documentation and export formats schools can trust.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:py-32">
          <AnimateIn className="mx-auto max-w-2xl text-center" delay={80}>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#6E6E73]">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1D1D1F] md:text-5xl">
              Three steps to licensed.
            </h2>
          </AnimateIn>

          <div className="relative mx-auto mt-16 max-w-6xl">
            <div className="absolute left-[16%] right-[16%] top-16 hidden border-t border-dashed border-[#D2D2D7] lg:block" />
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
              {steps.map((step, index) => (
                <AnimateIn key={step.number} className="relative bg-white px-4 text-center" delay={120 + index * 90}>
                  <p className="font-display text-[80px] leading-none text-[#D2D2D7]">{step.number}</p>
                  <h3 className="mt-4 text-xl font-semibold text-[#1D1D1F]">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#6E6E73]">{step.body}</p>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#1D1D1F] px-5 py-24 text-white md:py-32">
          <AnimateIn className="mx-auto max-w-2xl text-center" delay={100}>
            <h2 className="font-display text-[52px] leading-none font-light tracking-[-0.02em] md:text-[72px]">
              Your career starts here.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[19px] text-white/60">
              Join Virginia esthetics students building their future with Aesthetica.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#"
                className="rounded-full bg-white px-6 py-3 text-[17px] font-semibold text-[#1D1D1F] transition-opacity hover:opacity-90"
              >
                Get Started Free
              </Link>
              <Link
                href="#schools"
                className="rounded-full border border-white/20 px-6 py-3 text-[17px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                For Schools
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>

      <MarketingFooter />
    </>
  )
}
