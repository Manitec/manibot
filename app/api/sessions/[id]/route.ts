<<<<<<< HEAD
import { NextResponse } from 'next/server'
import { getMessages, deleteSession } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const messages = await getMessages(params.id)
  return NextResponse.json(messages)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteSession(params.id)
  return NextResponse.json({ ok: true })
}
=======
import { NextResponse } from 'next/server'
import { getMessages, deleteSession } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const messages = await getMessages(params.id)
  return NextResponse.json(messages)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteSession(params.id)
  return NextResponse.json({ ok: true })
}
>>>>>>> 520bdc2917b2373540b97d155df28f200306f2f5
