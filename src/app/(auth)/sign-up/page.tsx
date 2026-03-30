import type { Metadata } from "next"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: {
    absolute: "Get Started · Aesthetica",
  },
}

export default function SignUpPage() {
  return <SignUpForm />
}
