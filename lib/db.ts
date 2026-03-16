import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
}

export async function getSessions() {
  return sql`SELECT * FROM sessions ORDER BY created_at DESC`
}

export async function getMessages(sessionId: string) {
  return sql`SELECT * FROM messages WHERE session_id = ${sessionId} ORDER BY created_at ASC`
}

export async function createSession(id: string, title: string) {
  return sql`INSERT INTO sessions (id, title) VALUES (${id}, ${title}) ON CONFLICT DO NOTHING`
}

export async function saveMessage(id: string, sessionId: string, role: string, content: string) {
  return sql`INSERT INTO messages (id, session_id, role, content) VALUES (${id}, ${sessionId}, ${role}, ${content}) ON CONFLICT DO NOTHING`
}

export async function deleteSession(id: string) {
  return sql`DELETE FROM sessions WHERE id = ${id}`
}
