import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client';

const db = createClient({
  url: 'file:conference.db'
});

export const GET: APIRoute = async ({ url }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
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
