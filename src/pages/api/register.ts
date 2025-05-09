import type { APIRoute } from 'astro';
import { createRegistration } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    const body = await request.text();
    console.log('Received body:', body);

    if (!body) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Empty request body' 
        }), 
        { status: 400, headers }
      );
    }

    const data = JSON.parse(body);
    
    // Basic validation
    if (!data?.organization || !Array.isArray(data?.attendees) || !data?.totalAmount) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Missing required fields: organization, attendees, or totalAmount' 
        }), 
        { status: 400, headers }
      );
    }

    // Format data for database
    const registrationData = {
      organization: data.organization,
      attendees: data.attendees.map((att: any) => ({
        firstName: att.firstName,
        lastName: att.lastName
      })),
      totalAmount: Number(data.totalAmount),
      conferenceId: 'conf-2025'
    };

    const result = await createRegistration(registrationData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result 
      }), 
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Registration error:', error);
    
    // Ensure we always return JSON, even for errors
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed' 
      }), 
      { status: 500, headers }
    );
  }
};