import type { APIRoute } from 'astro';
import { createRegistration } from '../../lib/db.js';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }), 
    { status: 405 }
  );
};

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const data = await request.json();
    const result = await createRegistration(data);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Registration failed' }), 
      { status: 500, headers }
    );
  }
};