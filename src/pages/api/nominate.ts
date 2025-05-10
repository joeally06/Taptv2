import type { APIRoute } from 'astro';
import { createHallOfFameNomination } from '../../lib/db.js';

interface NominationData {
  nomineeName: string;
  district: string;
  yearsOfService: number;
  nominatorName: string;
  nominatorEmail: string;
  nominatorPhone: string;
}

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  try {
    const data = await request.json();
    console.log('Received nomination data:', data);
    
    // Validate required fields
    const requiredFields: (keyof NominationData)[] = [
      'nomineeName',
      'district',
      'yearsOfService',
      'nominatorName',
      'nominatorEmail',
      'nominatorPhone'
    ];
    
    const missingFields = requiredFields.filter(field => {
      const value = data[field];
      const isInvalid = value === undefined || value === null || value === '';
      if (isInvalid) {
        console.log(`Missing or invalid field: ${field}, value:`, value);
      }
      return isInvalid;
    });

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return new Response(
        JSON.stringify({ 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        }),
        { status: 400, headers }
      );
    }

    // Validate data types
    if (typeof data.yearsOfService !== 'number' || data.yearsOfService < 0) {
      return new Response(
        JSON.stringify({ error: 'Years of service must be a positive number' }),
        { status: 400, headers }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.nominatorEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers }
      );
    }

    if (!/^\d{3}-\d{3}-\d{4}$/.test(data.nominatorPhone)) {
      return new Response(
        JSON.stringify({ error: 'Phone number must be in format: 123-456-7890' }),
        { status: 400, headers }
      );
    }

    console.log('Submitting nomination with data:', data);
    const result = await createHallOfFameNomination(data);
    console.log('Nomination successful:', result);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error('Nomination error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create nomination. Please try again.' 
      }), 
      { status: 500, headers }
    );
  }
};