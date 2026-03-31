'use client'

import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { GoogleIcon } from '@/components/auth/google-icon'
import { signIn } from 'next-auth/react'

const inputClassName =
  'h-12 w-full rounded-xl border border-[#D2D2D7] bg-white px-4 text-[15px] text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none ring-0 focus:border-[#3D1A4B] focus:ring-2 focus:ring-[#3D1A4B]/10 transition-all'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsPending(true)

    const form = event.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsPending(false)

    if (result?.error) {
      setError('Invalid email or password.')
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div>
      <h1 className="text-[30px] font-semibold text-[#1D1D1F]">Welcome back.</h1>
      <p className="mt-2 text-[15px] text-[#6E6E73]">Sign in to your Aesthetica account.</p>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-600">
          {error}
        </div>
      )}

      <form className="mt-8 flex max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[14px] font-medium text-[#1D1D1F]">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={inputClassName}
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-[14px] font-medium text-[#1D1D1F]">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={cn(inputClassName, 'pr-11')}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <div className="text-right">
            <Link href="/forgot-password" className="text-[13px] text-[#3D1A4B] hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-xl bg-[#3D1A4B] text-[15px] font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {isPending ? 'Signing in…' : 'Sign In'}
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-[#D2D2D7]" />
          <span className="text-[12px] text-[#6E6E73]">or</span>
          <div className="h-px flex-1 bg-[#D2D2D7]" />
        </div>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D2D2D7] bg-white text-[15px] font-medium text-[#1D1D1F] shadow-sm hover:bg-[#F5F5F7] transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </form>

      <p className="mt-6 text-[14px] text-[#6E6E73]">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="font-semibold text-[#3D1A4B] hover:underline">
          Get started →
        </Link>
      </p>
    </div>
  )
}
