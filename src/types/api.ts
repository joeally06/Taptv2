import { z } from 'zod';

// Base response schema
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});

// Registration schemas
export const AttendeeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const RegistrationSchema = z.object({
  organization: z.string(),
  attendees: z.array(AttendeeSchema),
  totalAmount: z.number(),
  conferenceId: z.string(),
});

// Luncheon registration schema
export const LuncheonRegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  jobTitle: z.string(),
  district: z.string(),
  departmentLocation: z.string(),
  email: z.string().email(),
  phone: z.string(),
  groupSize: z.number().int().positive(),
  location: z.string(),
});

// Hall of Fame nomination schema
export const HallOfFameNominationSchema = z.object({
  nominee_name: z.string(),
  nominator_name: z.string(),
  nominator_email: z.string().email(),
  nomination_reason: z.string(),
  district: z.string(),
});

// Scholarship application schema
export const ScholarshipApplicationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthMonth: z.string(),
  birthDay: z.number(),
  birthYear: z.number(),
  email: z.string().email(),
  mobile: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zipCode: z.string(),
  highSchool: z.string(),
  schoolDistrict: z.string(),
  graduationYear: z.number(),
  essay: z.string(),
});

// Export types derived from schemas
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type Attendee = z.infer<typeof AttendeeSchema>;
export type Registration = z.infer<typeof RegistrationSchema>;
export type LuncheonRegistration = z.infer<typeof LuncheonRegistrationSchema>;
export type HallOfFameNomination = z.infer<typeof HallOfFameNominationSchema>;
export type ScholarshipApplication = z.infer<typeof ScholarshipApplicationSchema>;