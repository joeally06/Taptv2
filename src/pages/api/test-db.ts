import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client';
import { join } from 'path';

export const prerender = false;

const dataDir = join(process.cwd(), 'data');
const db = createClient({
  url: `file:${join(dataDir, 'conference.db')}`
});

export const GET: APIRoute = async ({ url }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    const type = url.searchParams.get('type');
    if (!type) {
      return new Response(JSON.stringify({ error: 'Type parameter is required' }), { status: 400, headers });
    }

    switch (type) {
      case 'hof':
        const nominations = await db.execute(`SELECT * FROM hall_of_fame_nominations ORDER BY created_at DESC LIMIT 10`);
        return new Response(JSON.stringify({ nominations: nominations.rows }), { status: 200, headers });
      
      case 'scholarship':
        const applications = await db.execute(`SELECT * FROM scholarship_applications ORDER BY created_at DESC LIMIT 10`);
        return new Response(JSON.stringify({ applications: applications.rows }), { status: 200, headers });
      
      default:
        return new Response(JSON.stringify({ error: 'Invalid type parameter' }), { status: 400, headers });
    }    // Unreachable code after switch statement has been removed
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data' }), 
      { status: 500, headers }
    );
  }
};