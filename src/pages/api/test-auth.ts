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
    
    console.log('Auth cookie found:', !!authCookie);
    
    if (!authCookie) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No authentication cookie found - user is not authenticated',
          debug: {
            cookies: request.headers.get('cookie'),
            timestamp: new Date().toISOString()
          }
        }),
        { status: 401, headers }
      );
    }

    // Extract token and verify user
    const token = authCookie.split('=')[1].trim();
    console.log('Verifying token...');
    
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Auth error:', error);
      throw error;
    }

    if (!user) {
      console.log('No user found for token');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid authentication token',
          debug: {
            tokenExists: !!token,
            timestamp: new Date().toISOString()
          }
        }),
        { status: 401, headers }
      );
    }

    // Check if user is admin
    const isAdmin = user.user_metadata?.role === 'admin';
    console.log('User metadata:', user.user_metadata);

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
        error: error instanceof Error ? error.message : 'Failed to authenticate with Supabase',
        debug: {
          errorType: error instanceof Error ? error.constructor.name : typeof error,
          timestamp: new Date().toISOString()
        }
      }),
      { status: 500, headers }
    );
  }
}