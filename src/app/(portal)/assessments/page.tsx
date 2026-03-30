import { CheckCircle2, FileText, Lock } from 'lucide-react'

const mockAssessments = [
  {
    id: '1',
    title: 'Chapter 1 Quiz',
    chapter: 'Introduction & Safety',
    score: 92,
    passed: true,
    date: '2026-03-15',
    questions: 15,
  },
  {
    id: '2',
    title: 'Chapter 2 Quiz',
    chapter: 'Skin Anatomy',
    score: 78,
    passed: true,
    date: '2026-03-22',
    questions: 20,
  },
  {
    id: '3',
    title: 'Chapter 3 Quiz',
    chapter: 'Skin Analysis',
    score: null,
    passed: null,
    date: null,
    questions: 15,
    available: true,
  },
  {
    id: '4',
    title: 'Chapter 4 Quiz',
    chapter: 'Facial Treatments',
    score: null,
    passed: null,
    date: null,
    questions: 18,
    available: false,
  },
]

export default function AssessmentsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header>
        <h1 className="text-2xl font-semibold text-[#1D1D1F]">Assessments</h1>
        <p className="mt-1 text-sm text-[#6E6E73]">Chapter quizzes and progress checks</p>
      </header>

      <section className="mt-8 flex flex-col gap-3">
        {mockAssessments.map((assessment) => {
          const isPassed = Boolean(assessment.passed)
          const isAvailable = Boolean(assessment.available)

          return (
            <article key={assessment.id} className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full">
                {isPassed ? (
                  <span className="flex size-12 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2 className="size-5 text-[#276749]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                ) : isAvailable ? (
                  <span className="flex size-12 items-center justify-center rounded-full bg-[#3D1A4B]/8">
                    <FileText className="size-5 text-[#3D1A4B]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                ) : (
                  <span className="flex size-12 items-center justify-center rounded-full bg-[#F5F5F7]">
                    <Lock className="size-5 text-[#6E6E73]/60" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-base font-semibold text-[#1D1D1F]">{assessment.title}</h2>
                <p className="mt-1 text-[13px] text-[#6E6E73]">{assessment.chapter}</p>
                {isPassed && assessment.score !== null && assessment.date ? (
                  <p className="mt-2 text-xs font-medium text-[#276749]">
                    {assessment.score} / 100 · Passed · {assessment.date}
                  </p>
                ) : null}
              </div>

              <div>
                {isPassed ? (
                  <button className="text-sm font-medium text-[#3D1A4B] hover:opacity-80">Review →</button>
                ) : isAvailable ? (
                  <button className="rounded-full bg-[#3D1A4B] px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90">
                    Start Quiz →
                  </button>
                ) : (
                  <span className="text-[13px] text-[#6E6E73]">Locked</span>
                )}
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
