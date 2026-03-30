"use client"

import Link from "next/link"
import { CheckCircle2, Mail } from "lucide-react"
import { type FormEvent, useState } from "react"

const inputClassName =
  "h-12 w-full rounded-xl border border-[#D2D2D7] bg-white px-4 text-[15px] text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none ring-0 focus:border-[#3D1A4B] focus:ring-2 focus:ring-[#3D1A4B]/10"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full text-left">
        <Link href="/sign-in" className="text-[13px] text-[#6E6E73] hover:text-[#1D1D1F]">
          ← Back to sign in
        </Link>
      </div>

      {!submitted ? (
        <>
          <Mail className="mt-8 size-8 text-[#3D1A4B]" aria-hidden="true" />
          <h1 className="mt-4 text-[28px] font-semibold text-[#1D1D1F]">Forgot your password?</h1>
          <p className="mt-3 max-w-xs text-[15px] text-[#6E6E73]">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm space-y-4">
            <label htmlFor="reset-email" className="sr-only">
              Email address
            </label>
            <input
              id="reset-email"
              type="email"
              placeholder="you@example.com"
              className={inputClassName}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#3D1A4B] text-[15px] font-semibold text-white shadow-sm hover:opacity-90"
            >
              Send Reset Link
            </button>
          </form>
        </>
      ) : (
        <>
          <CheckCircle2 className="mt-10 size-10 text-[#276749]" aria-hidden="true" />
          <h1 className="mt-4 text-[28px] font-semibold text-[#1D1D1F]">Check your inbox</h1>
          <p className="mt-3 max-w-sm text-[15px] text-[#6E6E73]">
            We sent a password reset link to <span className="font-medium text-[#1D1D1F]">{email}</span>.
          </p>

          <button type="button" className="mt-5 text-[13px] text-[#3D1A4B] hover:underline">
            Resend email
          </button>

          <Link href="/sign-in" className="mt-4 text-[13px] text-[#6E6E73] hover:text-[#1D1D1F]">
            ← Back to sign in
          </Link>
        </>
      )}
    </div>
  )
}
