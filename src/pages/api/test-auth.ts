import type { APIRoute } from 'astro';
import { supabase } from '../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  };

  try {
    // Get the session from the request cookies
    const authCookie = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('sb-access-token='));
    
    if (!authCookie) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No authentication cookie found - user is not authenticated'
        }),
        { status: 401, headers }
      );
    }

    // Extract token and verify user
    const token = authCookie.split('=')[1].trim();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      throw error;
    }

    if (!user) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid authentication token'
        }),
        { status: 401, headers }
      );
    }

    // Check if user is admin
    const isAdmin = user.user_metadata?.role === 'admin';

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: isAdmin ? 'Successfully authenticated as admin' : 'User is not an admin',
        user: {
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role
        }
      }),
      { status: isAdmin ? 200 : 403, headers }
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