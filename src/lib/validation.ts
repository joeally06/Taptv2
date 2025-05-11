import { z } from 'zod';
import { ValidationError } from './errors';

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors.map(e => e.message).join(', '));
    }
    throw error;
  }
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

export function validateZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}$/;
  return zipRegex.test(zipCode);
}