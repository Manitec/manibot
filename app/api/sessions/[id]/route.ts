import { NextResponse } from 'next/server'
import { getMessages, deleteSession } from '@/lib/db'

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const messages = await getMessages(id)
  return NextResponse.json(messages)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await deleteSession(id)
  return NextResponse.json({ ok: true })
}
