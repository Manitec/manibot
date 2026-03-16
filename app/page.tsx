'use client'
import { useState, useCallback } from 'react'
import Chat from '@/components/chat'
import Sidebar from '@/components/sidebar'
import { nanoid } from 'nanoid'

export default function Page() {
  const [sessionId, setSessionId] = useState(() => nanoid())

  const handleNew = useCallback(() => setSessionId(nanoid()), [])

  return (
    <div className="flex h-screen">
      <Sidebar activeId={sessionId} onSelect={setSessionId} onNew={handleNew} />
      <main className="flex-1 overflow-hidden">
        <Chat key={sessionId} sessionId={sessionId} />
      </main>
    </div>
  )
}
