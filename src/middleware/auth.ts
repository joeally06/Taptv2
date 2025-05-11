import type { MiddlewareResponseHandler } from 'astro';
import { supabase } from '../lib/supabase';

export const authMiddleware: MiddlewareResponseHandler = async ({ request, redirect }) => {
  const authCookie = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='));

  if (!authCookie) {
    return redirect('/login');
  }

  const token = authCookie.split('=')[1].trim();
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      // Clear invalid session cookie
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/login',
          'Set-Cookie': 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=lax'
        }
      });
    }
    
    // Refresh token if needed
    const { data: { session } } = await supabase.auth.refreshSession();
    if (session?.access_token) {
      return new Response(null, {
        status: 200,
        headers: {
          'Set-Cookie': `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=lax`
        }
      });
    }
    
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return redirect('/login');
  }
};