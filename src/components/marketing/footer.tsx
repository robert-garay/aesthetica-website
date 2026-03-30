import Link from 'next/link'

const links = [
  { href: '#features', label: 'Learn' },
  { href: '#schools', label: 'For Schools' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#', label: 'Sign In' },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-[#D2D2D7] bg-[#F5F5F7]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 text-[13px] text-[#6E6E73]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="font-display text-[18px] font-medium text-[#1D1D1F]">aesthetica</p>
            <p>Virginia state-qualified aesthetic learning portal.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-[#1D1D1F]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-[#D2D2D7] pt-6 md:flex-row md:items-center">
          <p>© 2026 Aesthetica. Virginia DPOR Qualified.</p>
          <div className="flex items-center gap-3">
            <Link href="#" className="transition-colors hover:text-[#1D1D1F]">
              Privacy
            </Link>
            <span>·</span>
            <Link href="#" className="transition-colors hover:text-[#1D1D1F]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
