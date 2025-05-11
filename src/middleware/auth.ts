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
  '/api/test-db',
  '/hall-of-fame',
  '/board',
  '/advisory-board',
  '/conference-registration',
  '/luncheon-registration',
  '/scholarship'
];

export const authMiddleware: MiddlewareResponseHandler = async ({ request, locals }) => {
  const url = new URL(request.url);
  
  // Skip auth for public paths and static assets
  if (PUBLIC_PATHS.some(path => url.pathname.startsWith(path)) || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|svg|css|js)$/)) {
    return undefined;
  }

  // Get auth token from cookie
  const authCookie = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='));

  if (!authCookie) {
    return Response.redirect(new URL('/login', request.url));
  }

  const token = authCookie.split('=')[1].trim();

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return Response.redirect(new URL('/login', request.url));
    }

    // Check admin access for admin routes
    if (url.pathname.startsWith('/admin')) {
      const isAdmin = user.user_metadata?.role === 'admin';
      if (!isAdmin) {
        return Response.redirect(new URL('/', request.url));
      }
    }

    // Set user in locals
    locals.user = {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'user'
    };

    // Continue processing the request
    return undefined;

  } catch (error) {
    console.error('Auth middleware error:', error);
    return Response.redirect(new URL('/login', request.url));
  }
};