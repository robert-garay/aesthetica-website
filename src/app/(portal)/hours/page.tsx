import { BookOpen, Clock, Download, Play } from 'lucide-react'

const mockHours = {
  logged: 49.0,
  verified: 47.5,
  required: 600,
  sessions: [
    {
      date: '2026-03-30',
      type: 'Video',
      duration: '1h 23m',
      lesson: 'Chapter 3, Lessons 1–3',
      verified: true,
      time: '2:14 PM – 3:37 PM',
    },
    {
      date: '2026-03-30',
      type: 'Reading',
      duration: '30m',
      lesson: 'Chapter 3 supplemental',
      verified: false,
      time: '4:00 PM – 4:30 PM',
    },
    {
      date: '2026-03-29',
      type: 'Video',
      duration: '2h 05m',
      lesson: 'Chapter 2, Lessons 6–8',
      verified: true,
      time: '7:00 PM – 9:05 PM',
    },
    {
      date: '2026-03-28',
      type: 'Video',
      duration: '1h 45m',
      lesson: 'Chapter 2, Lessons 3–5',
      verified: true,
      time: '6:30 PM – 8:15 PM',
    },
  ],
}

export default function HoursPage() {
  const progress = (mockHours.logged / mockHours.required) * 100
  const progressLabel = `${progress.toFixed(1)}%`
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const strokeOffset = circumference - (progress / 100) * circumference

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="mb-8 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-[#1D1D1F]">Hours</h1>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] px-4 py-2 text-[13px] font-medium text-[#1D1D1F] hover:bg-[#F5F5F7]">
          <Download className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          Export Report
        </button>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-display text-5xl leading-none font-normal text-[#1D1D1F]">{mockHours.logged.toFixed(1)} hrs</p>
          <p className="mt-2 text-xs text-[#6E6E73]">Total Logged</p>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-display text-5xl leading-none font-normal text-[#1D1D1F]">{mockHours.verified.toFixed(1)} hrs</p>
          <p className="mt-2 text-xs text-[#6E6E73]">Verified</p>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-display text-5xl leading-none font-normal text-[#1D1D1F]">{progressLabel}</p>
          <p className="mt-2 text-xs text-[#6E6E73]">Progress</p>
        </article>
      </section>

      <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-[10px] font-medium tracking-[0.16em] text-[#6E6E73] uppercase">Toward Your License</p>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-[28px] font-semibold text-[#1D1D1F]">{mockHours.logged.toFixed(1)} hrs</p>
            <p className="text-sm text-[#6E6E73]">of {mockHours.required} required</p>

            <div className="mt-4 h-2.5 rounded-full bg-[#F5F5F7]">
              <div className="h-full rounded-full bg-[#3D1A4B]" style={{ width: progressLabel }} />
            </div>

            <p className="mt-3 text-xs text-[#6E6E73]">At your current pace, you&apos;ll complete by June 15, 2026</p>
            <span className="mt-3 inline-flex rounded-full bg-[#276749] px-2.5 py-1 text-[11px] font-medium text-white">On track</span>
          </div>

          <div className="flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
              <circle cx="40" cy="40" r={radius} stroke="#F5F5F7" strokeWidth="6" fill="none" />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#3D1A4B"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            <span className="absolute text-sm font-semibold text-[#1D1D1F]">{progressLabel}</span>
          </div>
        </div>
      </section>

      <button className="mb-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3D1A4B] px-4 text-[15px] font-semibold text-white hover:opacity-90">
        <Clock className="size-4" strokeWidth={1.5} aria-hidden="true" />
        Clock In
      </button>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-black/5 px-6 py-4">
          <h2 className="text-[15px] font-semibold text-[#1D1D1F]">Session Log</h2>
          <button className="text-[13px] text-[#6E6E73]">All time ▾</button>
        </header>

        <ul>
          {mockHours.sessions.map((session) => (
            <li key={`${session.date}-${session.lesson}`} className="flex items-start gap-4 border-b border-black/5 px-6 py-4 last:border-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F7]">
                {session.type === 'Video' ? (
                  <Play className="size-4 text-[#3D1A4B]" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <BookOpen className="size-4 text-[#3D1A4B]" strokeWidth={1.5} aria-hidden="true" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <p className="text-sm font-medium text-[#1D1D1F]">{session.lesson}</p>
                  <p className="ml-auto shrink-0 text-sm font-semibold text-[#1D1D1F]">{session.duration}</p>
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <p className="text-xs text-[#6E6E73]">
                    {session.date} · {session.time}
                  </p>
                  <span className="ml-auto text-xs font-medium text-[#276749]">
                    {session.verified ? '✓ Verified' : <span className="text-amber-600">Pending</span>}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
