import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/', '/pricing', '/schools', '/about', '/sign-in', '/sign-up', '/forgot-password']
const AUTH_ROUTES = ['/sign-in', '/sign-up', '/forgot-password']
const PORTAL_PREFIX = ['/dashboard', '/courses', '/hours', '/skills', '/forums', '/messages', '/assessments', '/notifications', '/billing']

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session

  const isAuthRoute = AUTH_ROUTES.some((r) => nextUrl.pathname.startsWith(r))
  const isPortalRoute = PORTAL_PREFIX.some((r) => nextUrl.pathname.startsWith(r))

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // Redirect unauthenticated users away from portal
  if (!isLoggedIn && isPortalRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname)
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
