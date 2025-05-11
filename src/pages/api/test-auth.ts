import type { APIRoute } from 'astro';
import { supabase } from '../../lib/db';

export const GET: APIRoute = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully authenticated with Supabase',
        user
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Authentication test error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to authenticate with Supabase'
      }),
      { status: 500, headers }
    );
  }
}