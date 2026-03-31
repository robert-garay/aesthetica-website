'use client'

import Link from 'next/link'
import { BookOpen, Building2, Eye, EyeOff } from 'lucide-react'
import { useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { GoogleIcon } from '@/components/auth/google-icon'
import { signUpAction } from '@/actions/auth.actions'
import { signIn } from 'next-auth/react'


const inputClassName =
  'h-12 w-full rounded-xl border border-[#D2D2D7] bg-white px-4 text-[15px] text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none ring-0 focus:border-[#3D1A4B] focus:ring-2 focus:ring-[#3D1A4B]/10 transition-all'

function passwordStrength(password: string): number {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const strengthColors = ['bg-[#D2D2D7]', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-[#276749]']
const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

export function SignUpForm() {
  const [role, setRole] = useState<'STUDENT' | 'SCHOOL_ADMIN'>('STUDENT')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const strength = passwordStrength(password)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!agreed) { setError('Please agree to the Terms of Service.'); return }
    setError(null)
    const formData = new FormData(event.currentTarget)
    formData.set('role', role)
    startTransition(async () => {
      const result = await signUpAction(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result.email) {
        // Auto sign-in after successful registration
        const signInResult = await signIn('credentials', {
          email: result.email,
          password: formData.get('password') as string,
          redirect: false,
        })
        if (signInResult?.error) {
          setError('Account created. Please sign in.')
          window.location.href = '/sign-in'
        } else {
          window.location.href = '/dashboard'
        }
      }
    })
  }

  return (
    <div>
      <h1 className="text-[30px] font-semibold text-[#1D1D1F]">Start your journey.</h1>
      <p className="mt-2 text-[15px] text-[#6E6E73]">Create your Aesthetica account.</p>

      {/* Role selector */}
      <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm">
        {[
          { value: 'STUDENT' as const, icon: BookOpen, label: 'Student', desc: "I'm becoming a licensed esthetician" },
          { value: 'SCHOOL_ADMIN' as const, icon: Building2, label: 'School', desc: 'I manage a licensed school' },
        ].map(({ value, icon: Icon, label, desc }) => (
          <button
            key={value}
            type="button"
            onClick={() => setRole(value)}
            className={cn(
              'rounded-2xl border-[1.5px] p-4 text-left transition-all',
              role === value
                ? 'border-[#3D1A4B] bg-[#3D1A4B]/[0.04]'
                : 'border-[#D2D2D7] bg-white hover:border-[#6E6E73]'
            )}
          >
            <Icon className={cn('size-5 mb-2', role === value ? 'text-[#3D1A4B]' : 'text-[#6E6E73]')} />
            <p className="text-[13px] font-600 text-[#1D1D1F]">{label}</p>
            <p className="text-[11px] text-[#6E6E73] mt-0.5 leading-snug">{desc}</p>
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-600 max-w-sm">
          {error}
        </div>
      )}

      <form className="mt-6 flex max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-[14px] font-medium text-[#1D1D1F]">First name</label>
            <input id="firstName" name="firstName" type="text" placeholder="Maya" className={inputClassName} autoComplete="given-name" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-[14px] font-medium text-[#1D1D1F]">Last name</label>
            <input id="lastName" name="lastName" type="text" placeholder="Chen" className={inputClassName} autoComplete="family-name" required />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-[14px] font-medium text-[#1D1D1F]">Email address</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" className={inputClassName} autoComplete="email" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-[14px] font-medium text-[#1D1D1F]">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className={cn(inputClassName, 'pr-11')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
          {/* Password strength */}
          {password.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors', strength >= i ? strengthColors[strength] : 'bg-[#D2D2D7]')} />
                ))}
              </div>
              <p className="text-[11px] text-[#6E6E73]">{strengthLabels[strength]}</p>
            </div>
          )}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[#D2D2D7] accent-[#3D1A4B]"
          />
          <span className="text-[13px] text-[#6E6E73] leading-snug">
            I agree to the{' '}
            <Link href="/terms" className="text-[#3D1A4B] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-[#3D1A4B] hover:underline">Privacy Policy</Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-xl bg-[#3D1A4B] text-[15px] font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {isPending ? 'Creating account…' : 'Create Account'}
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
        Already have an account?{' '}
        <Link href="/sign-in" className="font-semibold text-[#3D1A4B] hover:underline">
          Sign in →
        </Link>
      </p>
    </div>
  )
}
