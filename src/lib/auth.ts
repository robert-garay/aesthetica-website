import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { GlobalRole } from '@prisma/client'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  // JWT sessions — no adapter, no database session reads on every request
  // User data is written to DB on sign-in via callbacks
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })]
      : []),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({
          where: { email },
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

        const valid = await bcrypt.compare(password, user.passwordHash)
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
      // Handle Google OAuth — upsert user in DB
      if (account?.provider === 'google' && profile?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        })

        if (!existingUser) {
          const names = (profile.name as string ?? '').split(' ')
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name as string,
              firstName: names[0] ?? null,
              lastName: names.slice(1).join(' ') || null,
              image: profile.picture as string ?? null,
              emailVerified: new Date(),
              globalRole: 'STUDENT',
            },
          })
        } else if (!existingUser.emailVerified) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { emailVerified: new Date() },
          })
        }

        // Store the DB user ID on the user object
        const dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
          select: { id: true, globalRole: true, isActive: true },
        })

        if (!dbUser?.isActive) return false

        user.id = dbUser.id
        ;(user as { globalRole?: GlobalRole }).globalRole = dbUser.globalRole
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.globalRole = (user as { globalRole?: GlobalRole }).globalRole ?? 'STUDENT'
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.globalRole = token.globalRole as GlobalRole
      }
      return session
    },
  },
})
