import { db } from './db.js';

export async function authenticateUser(email: string, password: string) {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [email, password]
  );
  
  return result.rows[0] || null;
}

export async function createUser(email: string, password: string, role: string = 'user') {
  const id = 'user-' + Math.random().toString(36).substr(2, 9);

  await db.query(
    'INSERT INTO users (id, email, password, role) VALUES ($1, $2, $3, $4)',
    [id, email, password, role]
  );

  return { id, email, role };
}

export async function isAdmin(userId: string) {
  const result = await db.query(
    'SELECT role FROM users WHERE id = $1',
    [userId]
  );
  
  return result.rows[0]?.role === 'admin';
}