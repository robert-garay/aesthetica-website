import { NextResponse } from 'next/server'

export async function GET() {
  // Only available in non-production for safety
  // Temporary: allow in production for debugging, remove after fix
  // if (process.env.NODE_ENV === 'production' && process.env.DEBUG_AUTH !== 'true') {
  //   return NextResponse.json({ error: 'not available' }, { status: 403 })
  // }

  return NextResponse.json({
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID ? `set (${process.env.AUTH_GOOGLE_ID.substring(0, 20)}...)` : 'MISSING',
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ? 'set' : 'MISSING',
    AUTH_SECRET: process.env.AUTH_SECRET ? 'set' : 'MISSING',
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ?? 'MISSING',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'MISSING',
    DATABASE_URL: process.env.DATABASE_URL ? 'set' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV,
  })
}
