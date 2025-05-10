import type { APIRoute } from 'astro';
import { createHallOfFameNomination } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    const formData = await request.json();
    
    // Transform form data to match database schema
    const nominationData = {
      nominee_name: `${formData.nomineeFirstName} ${formData.nomineeLastName}`,
      nominator_name: `${formData.supervisorFirstName} ${formData.supervisorLastName}`,
      nominator_email: formData.supervisorEmail,
      nomination_reason: '', // This field needs to be added to the form if required
      district: formData.district
    };

    const result = await createHallOfFameNomination(nominationData);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Nomination error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers }
    );
  }
}