import type { MiddlewareResponseHandler } from 'astro';
import { supabase } from '../lib/supabase';

export const authMiddleware: MiddlewareResponseHandler = async ({ request, redirect, locals }) => {
  // Skip auth check for public routes and static assets
  const url = new URL(request.url);
  const publicPaths = [
    '/login', 
    '/register', 
    '/', 
    '/images', 
    '/favicon.svg',
    '/_astro',
    '/api/auth-status'
  ];
  
  if (publicPaths.some(path => url.pathname.startsWith(path))) {
    return;
  }

  // Get auth token from cookie
  const authCookie = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='));

  if (!authCookie) {
    return redirect('/login');
  }

  const token = authCookie.split('=')[1].trim();
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return redirect('/login', {
        headers: {
          'Set-Cookie': 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=lax'
        }
      });
    }

    // Check admin access for admin routes
    if (url.pathname.startsWith('/admin')) {
      const isAdmin = user.user_metadata?.role === 'admin';
      if (!isAdmin) {
        return redirect('/');
      }
    }

    // Set user in locals for use in routes
    locals.user = {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'user'
    };

    return;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return redirect('/login');
  }
};