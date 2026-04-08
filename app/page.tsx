'use client'
import { useState, useCallback } from 'react'
import Chat from '@/components/chat'
import Sidebar from '@/components/sidebar'
import { nanoid } from 'nanoid'

export default function Page() {
  const [sessionId, setSessionId] = useState(() => nanoid())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNew = useCallback(() => {
    setSessionId(nanoid())
    setSidebarOpen(false)
  }, [])

  const handleSelect = useCallback((id: string) => {
    setSessionId(id)
    setSidebarOpen(false)
  }, [])

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Sidebar — hidden on mobile, always visible md+ */}
      <div className={`
        fixed inset-y-0 left-0 z-40 md:relative md:flex md:flex-shrink-0
        transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar
          activeId={sessionId}
          onSelect={handleSelect}
          onNew={handleNew}
        />
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main chat area */}
      <main className="flex-1 min-w-0 h-dvh overflow-hidden">
        <Chat
          key={sessionId}
          sessionId={sessionId}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          sidebarOpen={sidebarOpen}
        />
      </main>
    </div>
  )
}
