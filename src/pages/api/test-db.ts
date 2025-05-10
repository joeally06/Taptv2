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

  const type = url.searchParams.get('type');

  try {
    if (type === 'hof') {
      const nominations = await db.execute(`SELECT * FROM hall_of_fame_nominations LIMIT 10`);
      return new Response(JSON.stringify({ nominations: nominations.rows }), { status: 200, headers });
    }
    
    if (type === 'scholarship') {
      const applications = await db.execute(`SELECT * FROM scholarship_applications LIMIT 10`);
      return new Response(JSON.stringify({ applications: applications.rows }), { status: 200, headers });
    }

    const registrationId = url.searchParams.get('id');
    
    const registrations = await db.execute({
      sql: `SELECT * FROM registrations WHERE id = ?`,
      args: [registrationId]
    });

    const attendees = await db.execute({
      sql: `SELECT * FROM attendees WHERE registration_id = ?`,
      args: [registrationId]
    });

    return new Response(
      JSON.stringify({ 
        registration: registrations.rows[0],
        attendees: attendees.rows
      }), 
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data' }), 
      { status: 500, headers }
    );
  }
};
