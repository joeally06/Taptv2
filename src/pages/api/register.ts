import type { APIRoute } from 'astro';
import { createRegistration } from '../../lib/db';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }), 
    { status: 405 }
  );
};

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const body = await request.text();
    console.log('Received body:', body);

    if (!body) {
      return new Response(
        JSON.stringify({ error: 'Empty request body' }), 
        { status: 400, headers }
      );
    }

    const data = JSON.parse(body);
    
    // Enhanced validation
    if (!data?.organization || !Array.isArray(data?.attendees) || !data?.totalAmount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: organization, attendees, or totalAmount' }), 
        { status: 400, headers }
      );
    }

    // Validate each attendee has required fields
    const invalidAttendees = data.attendees.some((att: any) => {
      return !att.firstName || !att.lastName || !att.address || 
             !att.city || !att.state || !att.zip || !att.email || !att.phone;
    });

    if (invalidAttendees) {
      return new Response(
        JSON.stringify({ error: 'All attendees must have firstName, lastName, address, city, state, zip, email, and phone' }),
        { status: 400, headers }
      );
    }

    // Format data for database
    const registrationData = {
      organization: data.organization,
      attendees: data.attendees.map((att: any) => ({
        firstName: att.firstName,
        lastName: att.lastName,
        address: att.address,
        city: att.city,
        state: att.state,
        zip: att.zip,
        email: att.email,
        phone: att.phone
      })),
      totalAmount: Number(data.totalAmount),
      conferenceId: 'conf-2025'
    };

    const result = await createRegistration(registrationData);

    return new Response(
      JSON.stringify({ success: true, data: result }), 
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Registration failed',
        success: false 
      }), 
      { status: 500, headers }
    );
  }
};