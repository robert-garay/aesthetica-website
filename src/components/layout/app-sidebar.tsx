import Link from 'next/link'
import { cn } from '@/lib/utils'
import { portalNavSections } from '@/components/layout/portal-nav'

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 bg-[#1D1D1F] text-white md:flex md:flex-col">
      <div className="px-5 pt-6 pb-4">
        <p className="font-display text-[18px] leading-none font-normal text-white">aesthetica</p>
        <p className="mt-2 text-[13px] text-white/40">Maya Chen</p>
        <span className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/50">
          Student
        </span>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto px-3" aria-label="Portal navigation">
        {portalNavSections.map((section) => (
          <div key={section.label} className="mt-5 first:mt-0">
            <p className="mb-1 px-2 text-[10px] font-medium tracking-[0.16em] text-white/30 uppercase">{section.label}</p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = item.key === 'dashboard'

                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative flex h-9 items-center gap-3 rounded-lg px-2',
                        'hover:bg-white/5',
                        isActive &&
                          'bg-white/8 before:absolute before:top-1/2 before:left-0 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-[#C4748A]'
                      )}
                    >
                      <Icon className={cn('size-4 text-white/50', isActive && 'text-white')} strokeWidth={1.5} aria-hidden="true" />
                      <span className={cn('text-[13px] font-medium text-white/70', isActive && 'text-white')}>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto rounded-full bg-[#C4748A] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-5">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[12px] font-medium text-white/60">
            MC
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-white/80">Maya Chen</p>
            <p className="text-[12px] text-white/40">Student</p>
          </div>
          <Link href="#" className="text-[13px] text-white/30 hover:text-white/60">
            Sign out
          </Link>
        </div>
      </div>
    </aside>
  )
}
