import { createClient } from '@libsql/client';
import { join } from 'path';

const dataDir = join(process.cwd(), 'data');
const db = createClient({
  url: `file:${join(dataDir, 'conference.db')}`
});

export async function authenticateUser(email: string, password: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ? AND password = ?',
    args: [email, password]
  });
  
  return result.rows[0] || null;
}

export async function createUser(email: string, password: string, role: string = 'user') {
  const id = 'user-' + Math.random().toString(36).substr(2, 9);

  await db.execute({
    sql: `INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)`,
    args: [id, email, password, role]
  });

  return { id, email, role };
}

export async function isAdmin(userId: string) {
  const result = await db.execute({
    sql: 'SELECT role FROM users WHERE id = ?',
    args: [userId]
  });
  
  return result.rows[0]?.role === 'admin';
}