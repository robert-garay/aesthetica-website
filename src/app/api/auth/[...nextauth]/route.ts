import { handlers } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

async function wrappedGET(req: NextRequest, ctx: unknown) {
  try {
    return await handlers.GET(req, ctx as Parameters<typeof handlers.GET>[1])
  } catch (e) {
    console.error('[auth/GET error]', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

async function wrappedPOST(req: NextRequest, ctx: unknown) {
  try {
    return await handlers.POST(req, ctx as Parameters<typeof handlers.POST>[1])
  } catch (e) {
    console.error('[auth/POST error]', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export { wrappedGET as GET, wrappedPOST as POST }
