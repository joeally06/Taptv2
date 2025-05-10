import type { APIRoute } from 'astro';
// Database implementation will be added later
const db = null;

export const GET: APIRoute = async ({ url }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    // Get registration data
    const regId = url.searchParams.get('regId');
    const reg = regId ? await db.execute({
      sql: `
        SELECT r.*, json_group_array(json_object('firstName', a.first_name, 'lastName', a.last_name)) as attendees
        FROM registrations r
        LEFT JOIN attendees a ON r.id = a.registration_id
        WHERE r.id = ?
        GROUP BY r.id
      `,
      args: [regId]
    }) : { rows: [] };

    // Get luncheon registration
    const lunchId = url.searchParams.get('lunchId');
    const lunch = lunchId ? await db.execute({
      sql: `
        SELECT lr.*, le.location, le.city
        FROM luncheon_registrations lr
        JOIN luncheon_events le ON lr.event_id = le.id
        WHERE lr.id = ?
      `,
      args: [lunchId]
    }) : { rows: [] };

    // Get HOF nomination
    const hofId = url.searchParams.get('hofId');
    const hof = hofId ? await db.execute({
      sql: 'SELECT * FROM hall_of_fame_nominations WHERE id = ?',
      args: [hofId]
    }) : { rows: [] };

    // Get scholarship application
    const scholarId = url.searchParams.get('scholarId');
    const scholar = scholarId ? await db.execute({
      sql: 'SELECT * FROM scholarship_applications WHERE id = ?',
      args: [scholarId]
    }) : { rows: [] };

    return new Response(
      JSON.stringify({
        registration: reg.rows[0],
        luncheon: lunch.rows[0],
        hallOfFame: hof.rows[0],
        scholarship: scholar.rows[0]
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to verify submissions' }),
      { status: 500, headers }
    );
  }
};