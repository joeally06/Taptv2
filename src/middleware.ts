import { sequence } from 'astro:middleware';
import { authMiddleware } from './middleware/auth';
import type { MiddlewareResponseHandler } from 'astro';

const securityHeaders: MiddlewareResponseHandler = async (context) => {
  // Add security headers to the response
  if (!context.locals.skipAuth) {
    context.response.headers.set('X-Frame-Options', 'DENY');
    context.response.headers.set('X-Content-Type-Options', 'nosniff');
    context.response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    context.response.headers.set('X-XSS-Protection', '1; mode=block');
  }
  
  return context.response;
};

export const onRequest = sequence(authMiddleware, securityHeaders);