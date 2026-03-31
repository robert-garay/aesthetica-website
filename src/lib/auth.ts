import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { GlobalRole } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [GoogleProvider({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })]
      : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            passwordHash: true,
            globalRole: true,
            isActive: true,
          },
        })

        if (!user || !user.passwordHash || !user.isActive) return null

        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          globalRole: user.globalRole,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        const existing = await prisma.user.findUnique({ where: { email: profile.email } })
        if (!existing) {
          const fullName = profile.name as string ?? ''
          const names = fullName.split(' ')
          await prisma.user.create({
            data: {
              email: profile.email,
              name: fullName,
              firstName: names[0] ?? null,
              lastName: names.slice(1).join(' ') || null,
              image: (profile as { picture?: string }).picture ?? null,
              emailVerified: new Date(),
              globalRole: 'STUDENT',
            },
          })
        }
        const dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
          select: { id: true, isActive: true },
        })
        if (!dbUser?.isActive) return false
        user.id = dbUser.id
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // Fetch globalRole from DB on first sign-in
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { globalRole: true },
        })
        token.globalRole = dbUser?.globalRole ?? 'STUDENT'
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.globalRole = token.globalRole as GlobalRole
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
export default handler
