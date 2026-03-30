"use client"

import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { GoogleIcon } from "@/components/auth/google-icon"

const inputClassName =
  "h-12 w-full rounded-xl border border-[#D2D2D7] bg-white px-4 text-[15px] text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none ring-0 focus:border-[#3D1A4B] focus:ring-2 focus:ring-[#3D1A4B]/10"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <h1 className="text-[30px] font-semibold text-[#1D1D1F]">Welcome back.</h1>
      <p className="mt-2 text-[15px] text-[#6E6E73]">Sign in to your Aesthetica account.</p>

      <form className="mt-8 flex max-w-sm flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[14px] font-medium text-[#1D1D1F]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={inputClassName}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={cn(inputClassName, "pr-11")}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F]"
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          className="h-12 w-full rounded-xl bg-[#3D1A4B] text-[15px] font-semibold text-white shadow-sm hover:opacity-90"
        >
          Sign In
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-[#D2D2D7]" />
          <span className="text-[12px] text-[#6E6E73]">or</span>
          <div className="h-px flex-1 bg-[#D2D2D7]" />
        </div>

        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D2D2D7] bg-white text-[15px] font-medium text-[#1D1D1F] shadow-sm hover:bg-[#F5F5F7]"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </form>

      <p className="mt-6 text-[14px] text-[#6E6E73]">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-[#3D1A4B] hover:underline">
          Get started →
        </Link>
      </p>
    </div>
  )
}
