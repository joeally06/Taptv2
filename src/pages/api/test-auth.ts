import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No active session found',
          debug: {
            timestamp: new Date().toISOString()
          }
        }),
        { status: 401, headers }
      );
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(session.access_token);
    
    if (userError || !user) {
      throw userError || new Error('No user found');
    }

    const isAdmin = user.user_metadata?.role === 'admin';

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: isAdmin ? 'Successfully authenticated as admin' : 'User is not an admin',
        user: {
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role
        },
        debug: {
          metadata: user.user_metadata,
          timestamp: new Date().toISOString()
        }
      }),
      { status: isAdmin ? 200 : 403, headers }
    );
  } catch (error) {
    console.error('Authentication test error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to authenticate',
        debug: {
          errorType: error instanceof Error ? error.constructor.name : typeof error,
          timestamp: new Date().toISOString()
        }
      }),
      { status: 500, headers }
    );
  }
}