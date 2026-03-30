import Link from "next/link"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] md:grid md:grid-cols-[45%_55%]">
      <aside className="relative hidden bg-[#1D1D1F] px-10 py-12 text-white md:flex md:flex-col">
        <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
          <div>
            <p className="font-display text-[28px] leading-none font-normal tracking-[0.01em] text-white">aesthetica</p>
            <p className="mt-2 text-[15px] text-white/50">Learn to glow.</p>
          </div>

          <ul className="mt-12 flex flex-col gap-2" aria-label="Platform highlights">
            <li className="w-fit rounded-full bg-white/8 px-4 py-2 text-[13px] text-white/60">✦ 600-hour theory courses</li>
            <li className="w-fit rounded-full bg-white/8 px-4 py-2 text-[13px] text-white/60">✦ DPOR-ready hour tracking</li>
            <li className="w-fit rounded-full bg-white/8 px-4 py-2 text-[13px] text-white/60">✦ AI-powered tutoring</li>
          </ul>
        </div>

        <p className="absolute bottom-6 left-10 text-[11px] text-white/30">Virginia DPOR Qualified</p>
      </aside>

      <section className="relative flex min-h-screen items-center justify-center px-5 py-10 md:px-10">
        <div className="absolute right-5 top-6 md:right-10 md:top-8">
          <Link href="/" className="text-[13px] text-[#6E6E73] hover:text-[#1D1D1F]">
            ← Back to home
          </Link>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  )
}
