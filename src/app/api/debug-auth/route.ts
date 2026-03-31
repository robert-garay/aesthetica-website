import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

  // Test Google OIDC discovery reachability from Vercel
  try {
    const r = await fetch('https://accounts.google.com/.well-known/openid-configuration')
    const data = await r.json() as { authorization_endpoint?: string }
    results.google_oidc = data.authorization_endpoint ? 'reachable' : 'unreachable'
  } catch (e) {
    results.google_oidc = `FAILED: ${e instanceof Error ? e.message : String(e)}`
  }

  return NextResponse.json(results)
}
