import type { APIRoute } from 'astro';
import { supabase } from '../../lib/db';

export const GET: APIRoute = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    // First check if there's an active session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No active session - user is not authenticated'
        }),
        { status: 401, headers }
      );
    }

    // If we have a session, proceed to get the user
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