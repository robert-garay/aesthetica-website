const mockStudent = {
  name: 'Maya Chen',
  hoursLogged: 49.0,
  hoursRequired: 600,
  currentChapter: 3,
  currentLesson: 2,
  currentLessonTitle: 'Skin Types and Analysis',
  streakDays: 5,
  courseName: 'Basic Esthetics',
  quizAverage: 84,
  lessonsComplete: 18,
  totalLessons: 96,
}

export default function DashboardPage() {
  const theoryProgress = (mockStudent.hoursLogged / mockStudent.hoursRequired) * 100
  const lessonProgress = (mockStudent.lessonsComplete / mockStudent.totalLessons) * 100

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1D1D1F]">Good morning, {mockStudent.name.split(' ')[0]}.</h1>
          <p className="mt-1 text-sm text-[#6E6E73]">Monday, March 30, 2026</p>
        </div>
        <div className="inline-flex w-fit items-center rounded-full bg-[#C4748A] px-3 py-1 text-[13px] font-semibold text-white">
          🔥 {mockStudent.streakDays}-day streak
        </div>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">Theory Hours</p>
          <p className="font-display mt-2 text-[52px] leading-none font-normal text-[#1D1D1F]">{mockStudent.hoursLogged.toFixed(1)}</p>
          <p className="mt-1 text-[13px] text-[#6E6E73]">of {mockStudent.hoursRequired} required</p>
          <div className="mt-4 h-2 rounded-full bg-[#F5F5F7]">
            <div className="h-full rounded-full bg-[#3D1A4B]" style={{ width: `${theoryProgress.toFixed(1)}%` }} />
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-[#6E6E73]">
            <span className="size-1.5 rounded-full bg-[#276749]" aria-hidden="true" />
            On track · Estimated completion June 15
          </p>
        </article>

        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">Course Progress</p>
          <p className="font-display mt-2 text-[52px] leading-none font-normal text-[#1D1D1F]">{mockStudent.lessonsComplete}</p>
          <p className="mt-1 text-[13px] text-[#6E6E73]">of {mockStudent.totalLessons} lessons complete</p>
          <div className="mt-4 h-2 rounded-full bg-[#F5F5F7]">
            <div className="h-full rounded-full bg-[#C4748A]" style={{ width: `${lessonProgress.toFixed(1)}%` }} />
          </div>
          <p className="mt-3 text-xs text-[#6E6E73]">{mockStudent.courseName} · Chapter {mockStudent.currentChapter}</p>
        </article>

        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">Quiz Average</p>
          <p className="mt-2 flex items-end text-[#1D1D1F]">
            <span className="font-display text-[52px] leading-none font-normal">{mockStudent.quizAverage}</span>
            <span className="mb-2 ml-1 text-xl font-medium">%</span>
          </p>
          <p className="mt-1 text-[13px] text-[#6E6E73]">across all completed quizzes</p>
          <p className="mt-4 text-xs font-medium text-[#276749]">↑ 6pts from last week</p>
        </article>
      </section>

      <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-[10px] font-medium tracking-[0.16em] text-[#6E6E73] uppercase">Continue Learning</p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-[#1D1D1F]">
              Chapter {mockStudent.currentChapter}, Lesson {mockStudent.currentLesson} — {mockStudent.currentLessonTitle}
            </h2>
            <p className="mt-1 text-[13px] text-[#6E6E73]">67% through chapter</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-[#F5F5F7] sm:max-w-md">
              <div className="h-full w-[67%] rounded-full bg-[#3D1A4B]" />
            </div>
          </div>
          <button className="inline-flex w-fit items-center rounded-full bg-[#3D1A4B] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
            Continue →
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-[10px] font-medium tracking-[0.16em] text-[#6E6E73] uppercase">Today&apos;s Goals</p>
          <ul className="mt-4 space-y-3">
            {['Watch 1 lesson', 'Log 1.5 hours', 'Complete Chapter 3 quiz'].map((goal) => (
              <li key={goal} className="flex items-center gap-3">
                <span className="size-[18px] rounded-[5px] border border-[#D2D2D7]" aria-hidden="true" />
                <span className="text-sm text-[#1D1D1F]">{goal}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#6E6E73]">0 of 3 complete</p>
        </article>

        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-[10px] font-medium tracking-[0.16em] text-[#6E6E73] uppercase">Announcements</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Dr. Reyes</p>
              <p className="mt-1 text-[13px] text-[#6E6E73]">Chapter 3 quiz is now available. Good luck!</p>
              <p className="mt-1 text-[11px] text-[#6E6E73]/60">2 hours ago</p>
            </div>
            <div className="h-px bg-[#F5F5F7]" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Dr. Reyes</p>
              <p className="mt-1 text-[13px] text-[#6E6E73]">Remember to log your practical hours this week.</p>
              <p className="mt-1 text-[11px] text-[#6E6E73]/60">Yesterday</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
