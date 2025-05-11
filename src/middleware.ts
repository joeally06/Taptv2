import { sequence } from 'astro:middleware';
import { authMiddleware } from './middleware/auth';
import type { MiddlewareResponseHandler } from 'astro';

// Security headers middleware
const securityHeaders: MiddlewareResponseHandler = async ({ request }) => {
  const response = new Response(null, {
    status: 200,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-XSS-Protection': '1; mode=block'
    }
  });

  return response;
};

export const onRequest = sequence(authMiddleware, securityHeaders);