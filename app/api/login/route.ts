import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { password } = await req.json()
  
  if (password === process.env.GATE_PASSWORD) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('manibot_auth', process.env.GATE_PASSWORD!, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    return res
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
