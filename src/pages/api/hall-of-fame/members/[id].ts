import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client';

const db = createClient({
  url: 'file:conference.db'
});

export const DELETE: APIRoute = async ({ params }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    await db.execute({
      sql: 'DELETE FROM hall_of_fame_members WHERE id = ?',
      args: [params.id]
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete member' }),
      { status: 500, headers }
    );
  }
};