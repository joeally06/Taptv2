import type { APIRoute } from 'astro';
import { getLatestConference } from '../../lib/db';

export const GET: APIRoute = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const conference = await getLatestConference();
    return new Response(
      JSON.stringify({ data: conference }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error fetching conference:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch conference data' }),
      { status: 500, headers }
    );
  }
};