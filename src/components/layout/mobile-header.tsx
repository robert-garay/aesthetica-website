'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Menu, X } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { portalNavSections } from '@/components/layout/portal-nav'

export function MobileHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-[52px] items-center justify-between border-b border-black/5 bg-white/90 px-4 backdrop-blur-xl md:hidden">
      <Sheet>
        <SheetTrigger
          aria-label="Open navigation menu"
          className="inline-flex size-8 items-center justify-center rounded-md text-[#1D1D1F] hover:bg-black/5"
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </SheetTrigger>

        <SheetContent side="left" showCloseButton={false} className="w-[86%] max-w-[320px] border-r-0 bg-[#1D1D1F] p-0 text-white">
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <SheetTitle className="font-display text-[18px] leading-none font-normal text-white">aesthetica</SheetTitle>
            <SheetClose
              aria-label="Close menu"
              className="inline-flex size-8 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" strokeWidth={1.5} />
            </SheetClose>
          </div>

          <div className="px-5 pb-4">
            <p className="text-[13px] text-white/40">Maya Chen</p>
            <span className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/50">Student</span>
          </div>

          <nav className="mt-2 px-3 pb-5" aria-label="Mobile portal navigation">
            {portalNavSections.map((section) => (
              <div key={section.label} className="mt-5 first:mt-0">
                <p className="mb-1 px-2 text-[10px] font-medium tracking-[0.16em] text-white/30 uppercase">{section.label}</p>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                      <li key={item.key}>
                        <SheetClose
                          render={
                            <Link
                              href={item.href}
                              className={cn(
                                'relative flex h-9 items-center gap-3 rounded-lg px-2 hover:bg-white/5',
                                isActive &&
                                  'bg-white/8 before:absolute before:top-1/2 before:left-0 before:h-5 before:w-0.5 before:-translate-y-1/2 before:bg-[#C4748A]'
                              )}
                            />
                          }
                        >
                          <Icon className={cn('size-4 text-white/50', isActive && 'text-white')} strokeWidth={1.5} aria-hidden="true" />
                          <span className={cn('text-[13px] font-medium text-white/70', isActive && 'text-white')}>{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-[#C4748A] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                              {item.badge}
                            </span>
                          )}
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <p className="font-display text-[18px] leading-none font-normal text-[#1D1D1F]">aesthetica</p>

      <div className="flex items-center gap-2">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative inline-flex size-8 items-center justify-center rounded-md text-[#1D1D1F] hover:bg-black/5"
        >
          <Bell className="size-5" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#C4748A]" />
        </Link>
        <div className="flex size-6 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-medium text-[#6E6E73]">MC</div>
      </div>
    </header>
  )
}
