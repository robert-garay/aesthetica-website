import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-compatible auth config — no Prisma, no Node.js-only modules.
 * Used by the proxy (middleware) for session checking.
 */
export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [],
  callbacks: {
    authorized({ auth }) {
      return !!auth
    },
  },
}
