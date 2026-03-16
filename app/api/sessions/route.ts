import { NextResponse } from 'next/server'
import { getSessions, createSession, initDB } from '@/lib/db'

export async function GET() {
  await initDB()
  const sessions = await getSessions()
  return NextResponse.json(sessions)
}

export async function POST(req: Request) {
  await initDB()
  const { id, title } = await req.json()
  await createSession(id, title)
  return NextResponse.json({ ok: true })
}
