import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client';

const db = createClient({
  url: 'file:conference.db'
});

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    const data = await request.json();
    const id = 'hof-' + Math.random().toString(36).substr(2, 9);

    await db.execute({
      sql: `
        INSERT INTO hall_of_fame_members (id, name, district, induction_year, bio)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [id, data.name, data.district, data.inductionYear, data.bio || null]
    });

    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Create error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create member' }),
      { status: 500, headers }
    );
  }
};

export const PUT: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    const data = await request.json();

    await db.execute({
      sql: `
        UPDATE hall_of_fame_members
        SET name = ?, district = ?, induction_year = ?, bio = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      args: [data.name, data.district, data.inductionYear, data.bio || null, data.memberId]
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Update error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update member' }),
      { status: 500, headers }
    );
  }
};