'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/about', label: 'About' },
  { href: '/schools', label: 'For Schools' },
  { href: '/pricing', label: 'Pricing' },
]

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-200',
          scrolled && 'border-b border-black/5 bg-white/80 backdrop-blur-xl'
        )}
      >
        <nav
          className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5"
          aria-label="Main"
        >
          <Link href="/" className="font-display text-[20px] font-medium text-[#1D1D1F]">
            aesthetica
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-medium text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/sign-in"
              className="text-[14px] font-medium text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-[#3D1A4B] px-4 py-1.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Get Started →
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-[#1D1D1F] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          'fixed inset-0 z-40 bg-white/95 px-8 pt-24 backdrop-blur-xl transition-all duration-200 md:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div className="flex h-full flex-col justify-between pb-12">
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-4xl font-medium text-[#1D1D1F]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/sign-in"
              className="text-lg font-medium text-[#6E6E73]"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex w-fit rounded-full bg-[#3D1A4B] px-5 py-2.5 text-[15px] font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
