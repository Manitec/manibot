'use client'
import { useEffect, useState } from 'react'
import { PlusIcon, TrashIcon } from 'lucide-react'

type Session = { id: string; title: string; created_at: string }

interface SidebarProps {
  activeId: string
  onSelect: (id: string) => void
  onNew: () => void
}

export default function Sidebar({ activeId, onSelect, onNew }: SidebarProps) {
  const [sessions, setSessions] = useState<Session[]>([])

  async function load() {
    const res = await fetch('/api/sessions')
    const data = await res.json()
    setSessions(data)
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    await fetch(`/api/sessions/${id}`, { method: 'DELETE' })
    load()
    if (id === activeId) onNew()
  }

  useEffect(() => { load() }, [activeId])

  return (
    <aside className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col pt-16 p-3 gap-2">
      <button
        onClick={onNew}
        className="flex items-center gap-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-lg px-3 py-2 w-full"
      >
        <PlusIcon size={16} /> New Chat
      </button>
      <div className="flex flex-col gap-1 overflow-y-auto mt-2">
        {sessions.map(s => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm group ${
              s.id === activeId ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            <span className="truncate">{s.title}</span>
            <button
              onClick={e => handleDelete(e, s.id)}
              className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400"
            >
              <TrashIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </aside>
  )
}
