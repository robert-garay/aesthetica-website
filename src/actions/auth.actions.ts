'use server'

import { signIn, signOut } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

// ─── Sign In ──────────────────────────────────────────────────────────────────

export async function signInAction(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password.' }
        default:
          return { error: 'Something went wrong. Please try again.' }
      }
    }
    throw error
  }
}

// ─── Sign Up ──────────────────────────────────────────────────────────────────

const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  role: z.enum(['STUDENT', 'SCHOOL_ADMIN']).default('STUDENT'),
})

export async function signUpAction(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role') ?? 'STUDENT',
  })

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Invalid input.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, password, role } = parsed.data

  // Check if email already exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'An account with this email already exists.' }
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      passwordHash,
      globalRole: role,
    },
  })

  // Auto sign in after registration
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Account created but sign-in failed. Please sign in manually.' }
    }
    throw error
  }
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}
