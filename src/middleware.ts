import { sequence } from 'astro:middleware';
import { authMiddleware } from './middleware/auth';
import type { MiddlewareResponseHandler } from 'astro';

// Security headers middleware
const securityHeaders: MiddlewareResponseHandler = async ({ locals, request }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // Continue processing the request
  return undefined;
};

// Error handling middleware
const errorHandler: MiddlewareResponseHandler = async ({ locals }) => {
  try {
    return undefined;
  } catch (error) {
    console.error('Middleware error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const onRequest = sequence(errorHandler, authMiddleware, securityHeaders);