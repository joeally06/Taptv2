import type { MiddlewareResponseHandler } from 'astro';
import { supabase } from '../lib/supabase';

const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/',
  '/images',
  '/favicon.svg',
  '/_astro',
  '/api/auth-status',
  '/api/test-db'
];

export const authMiddleware: MiddlewareResponseHandler = async ({ request, locals }) => {
  const url = new URL(request.url);

  // Skip auth for public paths
  if (PUBLIC_PATHS.some(path => url.pathname.startsWith(path))) {
    return new Response(null, { status: 200 });
  }

  // Get auth token from cookie
  const authCookie = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='));

  if (!authCookie) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/login' }
    });
  }

  const token = authCookie.split('=')[1].trim();

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/login' }
      });
    }

    // Check admin access for admin routes
    if (url.pathname.startsWith('/admin')) {
      const isAdmin = user.user_metadata?.role === 'admin';
      if (!isAdmin) {
        return new Response(null, {
          status: 302,
          headers: { Location: '/' }
        });
      }
    }

    // Set user in locals
    locals.user = {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'user'
    };

    return new Response(null, { status: 200 });

  } catch (error) {
    console.error('Auth middleware error:', error);
    return new Response(null, {
      status: 302,
      headers: { Location: '/login' }
    });
  }
};