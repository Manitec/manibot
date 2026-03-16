'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
      router.push('/')
    } else {
      setError('Wrong password 🚫')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-zinc-900 rounded-xl">
        <h1 className="text-white text-2xl font-bold">ManiBot 🔒</h1>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 rounded bg-zinc-800 text-white"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          Enter
        </button>
      </form>
    </main>
  )
}
