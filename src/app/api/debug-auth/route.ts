import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'

export async function GET() {
  const results: Record<string, unknown> = {
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID ? `set (${process.env.AUTH_GOOGLE_ID.substring(0, 20)}...)` : 'MISSING',
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ? 'set' : 'MISSING',
    AUTH_SECRET: process.env.AUTH_SECRET ? 'set' : 'MISSING',
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ?? 'MISSING',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'MISSING',
    DATABASE_URL: process.env.DATABASE_URL ? 'set' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV,
  }

  // Test DB connectivity
  try {
    await prisma.$queryRaw`SELECT 1`
    results.db_connection = 'OK'
  } catch (e) {
    results.db_connection = `FAILED: ${e instanceof Error ? e.message : String(e)}`
  }

  // Test Prisma adapter methods exist (needed by NextAuth for database sessions)
  try {
    const adapter = PrismaAdapter(prisma)
    results.adapter_methods = Object.keys(adapter).join(', ')
  } catch (e) {
    results.adapter_error = `FAILED: ${e instanceof Error ? e.message : String(e)}`
  }

  // Test Google OIDC discovery reachability from Vercel
  try {
    const r = await fetch('https://accounts.google.com/.well-known/openid-configuration')
    const data = await r.json() as { authorization_endpoint?: string }
    results.google_oidc = data.authorization_endpoint ? 'reachable' : 'unreachable'
  } catch (e) {
    results.google_oidc = `FAILED: ${e instanceof Error ? e.message : String(e)}`
  }

  // Try creating a NextAuth request to see the internal error
  try {
    const { Auth } = await import('@auth/core')
    const Google = (await import('next-auth/providers/google')).default
    const req = new Request('https://aesthetica-website.vercel.app/api/auth/signin/google')
    const resp = await Auth(req, {
      trustHost: true,
      secret: process.env.AUTH_SECRET!,
      providers: [Google({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      })],
    })
    results.auth_test_status = resp.status
    results.auth_test_location = resp.headers.get('location')
  } catch (e) {
    results.auth_test_error = `${e instanceof Error ? e.constructor.name + ': ' + e.message : String(e)}`
  }

  return NextResponse.json(results)
}
