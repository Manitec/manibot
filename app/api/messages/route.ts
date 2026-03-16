<<<<<<< HEAD
import { NextResponse } from 'next/server'
import { saveMessage, initDB } from '@/lib/db'

export async function POST(req: Request) {
  await initDB()
  const { id, sessionId, role, content } = await req.json()
  await saveMessage(id, sessionId, role, content)
  return NextResponse.json({ ok: true })
}
=======
import { NextResponse } from 'next/server'
import { saveMessage, initDB } from '@/lib/db'

export async function POST(req: Request) {
  await initDB()
  const { id, sessionId, role, content } = await req.json()
  await saveMessage(id, sessionId, role, content)
  return NextResponse.json({ ok: true })
}
>>>>>>> 520bdc2917b2373540b97d155df28f200306f2f5
