import Link from 'next/link'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Maximize2,
  Play,
  PlayCircle,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const mockCourse = {
  title: 'Basic Esthetics',
  chapter: { number: 3, title: 'Skin Analysis' },
  lesson: { number: 2, title: 'Skin Types and Analysis', duration: '12 min' },
  chapters: [
    { number: 1, title: 'Introduction & Safety', lessons: 6, complete: true },
    { number: 2, title: 'Skin Anatomy', lessons: 8, complete: true },
    {
      number: 3,
      title: 'Skin Analysis',
      lessons: 8,
      complete: false,
      current: true,
      lessonList: [
        { number: 1, title: 'What is Skin Analysis?', complete: true, duration: '8 min' },
        { number: 2, title: 'Skin Types and Analysis', complete: false, duration: '12 min', current: true },
        { number: 3, title: 'Fitzpatrick Scale', complete: false, duration: '10 min' },
        { number: 4, title: 'Common Skin Conditions', complete: false, duration: '15 min' },
      ],
    },
    { number: 4, title: 'Facial Treatments', lessons: 10, complete: false },
    { number: 5, title: 'Hair Removal', lessons: 7, complete: false },
  ],
}

function ChapterList() {
  return (
    <div className="px-2 py-3">
      {mockCourse.chapters.map((chapter) => (
        <div key={chapter.number}>
          <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left hover:bg-black/5">
            <span className={cn('text-[13px] font-medium text-[#6E6E73]', chapter.current && 'text-[#1D1D1F]')}>
              Ch {chapter.number} · {chapter.title}
            </span>

            {chapter.complete ? (
              <CheckCircle2 className="size-4 text-[#276749]" strokeWidth={1.5} />
            ) : chapter.current ? (
              <ChevronDown className="size-4 text-[#6E6E73]" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="size-4 text-[#6E6E73]/50" strokeWidth={1.5} />
            )}
          </button>

          {chapter.current && chapter.lessonList ? (
            <ul className="mt-1 space-y-1 px-1 pb-2">
              {chapter.lessonList.map((lesson) => (
                <li key={lesson.number}>
                  <button
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left',
                      lesson.current ? 'bg-[#F5F5F7]' : 'hover:bg-black/5'
                    )}
                  >
                    {lesson.complete ? (
                      <CheckCircle2 className="size-4 shrink-0 text-[#276749]" strokeWidth={1.5} />
                    ) : lesson.current ? (
                      <PlayCircle className="size-4 shrink-0 text-[#3D1A4B]" strokeWidth={1.5} />
                    ) : (
                      <Circle className="size-4 shrink-0 text-[#6E6E73]" strokeWidth={1.5} />
                    )}
                    <span className={cn('text-[13px] text-[#6E6E73]', lesson.current && 'font-medium text-[#1D1D1F]')}>
                      {lesson.number}. {lesson.title}
                    </span>
                    <span className="ml-auto text-[11px] text-[#6E6E73]">{lesson.duration}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function VideoPanel() {
  return (
    <section className="relative aspect-video w-full shrink-0 bg-black md:aspect-[16/9]">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <PlayCircle className="size-16 text-white/70" strokeWidth={1.5} aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-white">{mockCourse.lesson.title}</p>
        <p className="mt-1 text-sm text-white/50">{mockCourse.lesson.duration}</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-14 items-center gap-4 bg-gradient-to-t from-black/70 to-transparent px-4 text-white/70">
        <button aria-label="Play lesson" className="text-white hover:text-white">
          <Play className="size-5" strokeWidth={1.5} />
        </button>
        <span className="font-mono text-[13px]">0:00 / 12:00</span>
        <div className="h-1 flex-1 rounded-full bg-white/20" />
        <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-white/60">1×</span>
        <button aria-label="Maximize video" className="text-white/60 hover:text-white">
          <Maximize2 className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  )
}

function LessonContent() {
  return (
    <section className="flex-1 overflow-y-auto bg-[#FBFBFD] px-4 py-4 md:px-8 md:py-6">
      <p className="text-xs text-[#6E6E73]">Basic Esthetics › Chapter 3 › Lesson 2</p>
      <h1 className="mt-3 text-2xl font-semibold text-[#1D1D1F]">Skin Types and Analysis</h1>
      <p className="mt-1 text-[13px] text-[#6E6E73]">12 min · Chapter 3: Skin Analysis</p>

      <div className="mt-6 flex gap-6 border-b border-black/6">
        {['Overview', 'Notes', 'Resources'].map((tab) => {
          const active = tab === 'Overview'
          return (
            <button
              key={tab}
              className={cn(
                'border-b-2 border-transparent pb-3 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F]',
                active && 'border-[#3D1A4B] text-[#1D1D1F]'
              )}
            >
              {tab}
            </button>
          )
        })}
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-[#1D1D1F]">In this lesson you&apos;ll learn:</p>
        <ul className="mt-3 space-y-2">
          {[
            'The 5 Fitzpatrick skin types and how to identify them',
            "How to assess a client's skin type accurately",
            'Common skin conditions associated with each type',
            'Documentation best practices for skin analysis',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#6E6E73]">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#3D1A4B]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-black/6 pt-6">
        <Link href="#" className="text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F]">
          ← Previous: Lesson 1
        </Link>
        <button className="rounded-full bg-[#3D1A4B] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
          Mark Complete &amp; Next →
        </button>
      </div>
    </section>
  )
}

export default function ChapterLessonPage() {
  const completedLessons = 18
  const totalLessons = 96
  const progress = (completedLessons / totalLessons) * 100

  return (
    <>
      <div className="hidden h-screen overflow-hidden md:flex">
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-black/6 bg-[#FBFBFD]">
          <div className="border-b border-black/6 px-4 pt-4 pb-3">
            <Link href="#" className="inline-flex items-center gap-1 text-[13px] text-[#6E6E73] hover:text-[#1D1D1F]">
              <ChevronLeft className="size-4" strokeWidth={1.5} />
              Back to Course
            </Link>
            <p className="mt-2 text-[15px] font-semibold text-[#1D1D1F]">{mockCourse.title}</p>
            <div className="mt-2 h-1 rounded-full bg-[#F5F5F7]">
              <div className="h-full rounded-full bg-[#3D1A4B]" style={{ width: `${progress.toFixed(1)}%` }} />
            </div>
          </div>

          <ChapterList />
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <VideoPanel />
          <LessonContent />
        </div>
      </div>

      <div className="flex flex-col md:hidden">
        <VideoPanel />
        <LessonContent />

        <Sheet>
          <SheetTrigger className="fixed right-4 bottom-20 z-30 rounded-full bg-[#1D1D1F] px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg">
            ≡ Chapters
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[76vh] rounded-t-2xl border-t-0 bg-[#FBFBFD] p-0">
            <div className="border-b border-black/6 px-4 pt-4 pb-3">
              <SheetTitle className="text-[15px] font-semibold text-[#1D1D1F]">Course Chapters</SheetTitle>
              <p className="mt-1 text-xs text-[#6E6E73]">{mockCourse.title}</p>
            </div>
            <div className="overflow-y-auto">
              <ChapterList />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
