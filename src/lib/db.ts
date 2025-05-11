import { supabase } from './supabase';
import type { 
  Conference, 
  BoardMember, 
  HallOfFameNomination,
  LuncheonRegistration,
  ScholarshipApplication,
  Registration
} from '../types/database';

export async function createHallOfFameNomination(data: Omit<HallOfFameNomination, 'id' | 'created_at' | 'updated_at'>) {
  const { data: nomination, error } = await supabase
    .from('hall_of_fame_nominations')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return nomination;
}

export async function getLatestConference(): Promise<Conference> {
  const { data, error } = await supabase
    .from('conferences')
    .select('*')
    .order('start_date', { ascending: true })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getBoardMembers(): Promise<BoardMember[]> {
  const { data, error } = await supabase
    .from('board_members')
    .select('*')
    .order('name');

  if (error) {
    throw error;
  }

  return data;
}

export async function getHallOfFameNominations(): Promise<HallOfFameNomination[]> {
  const { data, error } = await supabase
    .from('hall_of_fame_nominations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateConference(id: string, data: Partial<Conference>): Promise<Conference> {
  const { data: conference, error } = await supabase
    .from('conferences')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return conference;
}

export async function createConference(data: Omit<Conference, 'id' | 'created_at' | 'updated_at'>): Promise<Conference> {
  const { data: conference, error } = await supabase
    .from('conferences')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return conference;
}

export async function updateBoardMember(id: string, data: Partial<BoardMember>): Promise<BoardMember> {
  const { data: member, error } = await supabase
    .from('board_members')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return member;
}

export async function createBoardMember(data: Omit<BoardMember, 'id' | 'created_at' | 'updated_at'>): Promise<BoardMember> {
  const { data: member, error } = await supabase
    .from('board_members')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return member;
}

export async function deleteBoardMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('board_members')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export async function createLuncheonRegistration(data: Omit<LuncheonRegistration, 'id' | 'created_at'>): Promise<LuncheonRegistration> {
  const { data: registration, error } = await supabase
    .from('luncheon_registrations')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return registration;
}

export async function createScholarshipApplication(data: Omit<ScholarshipApplication, 'id' | 'created_at'>): Promise<ScholarshipApplication> {
  const { data: application, error } = await supabase
    .from('scholarship_applications')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return application;
}

export async function createRegistration(data: Omit<Registration, 'id' | 'created_at'>): Promise<Registration> {
  const { data: registration, error } = await supabase
    .from('registrations')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return registration;
}