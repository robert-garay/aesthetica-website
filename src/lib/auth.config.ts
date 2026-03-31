import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

/**
 * Edge-compatible auth config — no Prisma, no Node.js-only modules.
 * Used by the proxy (middleware) only for session checking.
 * Full auth config with Prisma adapter lives in auth.ts.
 */
export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    // Providers listed here for type-safety in middleware
    // Actual credentials validation happens in auth.ts (server-only)
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })]
      : []),
    Credentials({ credentials: {} }),
  ],
  callbacks: {
    authorized({ auth }) {
      // auth is the session object — used by middleware to check if logged in
      return !!auth
    },
  },
}
