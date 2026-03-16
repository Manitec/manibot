import { NextResponse } from 'next/server'
import { saveMessage, initDB } from '@/lib/db'

export async function POST(req: Request) {
  await initDB()
  const { id, sessionId, role, content } = await req.json()
  await saveMessage(id, sessionId, role, content)
  return NextResponse.json({ ok: true })
}
