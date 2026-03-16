<<<<<<< HEAD
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
=======
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
>>>>>>> 520bdc2917b2373540b97d155df28f200306f2f5
