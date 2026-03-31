import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const AUTH_ROUTES = ['/sign-in', '/sign-up', '/forgot-password']
const PORTAL_PREFIX = ['/dashboard', '/courses', '/hours', '/skills', '/forums', '/messages', '/assessments', '/notifications', '/billing']

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req
    const isLoggedIn = !!req.nextauth.token

    const isAuthRoute = AUTH_ROUTES.some((r) => nextUrl.pathname.startsWith(r))
    const isPortalRoute = PORTAL_PREFIX.some((r) => nextUrl.pathname.startsWith(r))

    if (isLoggedIn && isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl))
    }

    if (!isLoggedIn && isPortalRoute) {
      const callbackUrl = encodeURIComponent(nextUrl.pathname)
      return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, nextUrl))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized() {
        // Always run middleware — authorization logic is in the function above
        return true
      },
    },
    pages: {
      signIn: '/sign-in',
    },
  }
)

export const config = {
  // Only run middleware on app pages — never on API routes, static files, or images
  matcher: [
    '/dashboard/:path*',
    '/courses/:path*',
    '/hours/:path*',
    '/skills/:path*',
    '/forums/:path*',
    '/messages/:path*',
    '/assessments/:path*',
    '/notifications/:path*',
    '/billing/:path*',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
  ],
}
