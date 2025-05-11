import { sequence } from 'astro:middleware';
import { authMiddleware } from './middleware/auth';
import type { MiddlewareResponseHandler } from 'astro';

// Security headers middleware
const securityHeaders: MiddlewareResponseHandler = async ({ locals, request }) => {
  const response = await locals.response;
  
  if (!locals.skipAuth) {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-XSS-Protection', '1; mode=block');
  }
  
  return response;
};

export const onRequest = sequence(authMiddleware, securityHeaders);