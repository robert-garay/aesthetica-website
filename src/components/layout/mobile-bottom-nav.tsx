'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { mobileTabs } from '@/components/layout/portal-nav'

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden" aria-label="Primary mobile navigation">
      <ul className="grid h-14 grid-cols-5">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon
          const active = isActivePath(pathname, tab.href)

          return (
            <li key={tab.key}>
              <Link
                href={tab.href}
                className={cn(
                  'relative flex h-full flex-col items-center justify-center gap-0.5 text-[#6E6E73]',
                  active && 'text-[#3D1A4B]'
                )}
                aria-current={active ? 'page' : undefined}
              >
                <span className={cn('absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-transparent', active && 'bg-[#3D1A4B]')} />
                <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
