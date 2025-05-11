import { supabase } from './supabase';

export async function createHallOfFameNomination(data: {
  nominee_name: string;
  nominator_name: string;
  nominator_email: string;
  nomination_reason: string;
  district: string;
}) {
  console.log('Creating nomination with data:', data);

  const { data: nomination, error } = await supabase
    .from('hall_of_fame_nominations')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }

  console.log('Nomination created successfully:', nomination);
  return nomination;
}

export async function getLatestConference() {
  const { data, error } = await supabase
    .from('conferences')
    .select('*')
    .order('start_date', { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching conference:', error);
    throw error;
  }

  return data;
}

export async function getBoardMembers() {
  const { data, error } = await supabase
    .from('board_members')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching board members:', error);
    throw error;
  }

  return data;
}

export async function getHallOfFameNominations() {
  const { data, error } = await supabase
    .from('hall_of_fame_nominations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching nominations:', error);
    throw error;
  }

  return data;
}

export async function updateConference(id: string, data: any) {
  const { data: conference, error } = await supabase
    .from('conferences')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating conference:', error);
    throw error;
  }

  return conference;
}

export async function createConference(data: any) {
  const { data: conference, error } = await supabase
    .from('conferences')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating conference:', error);
    throw error;
  }

  return conference;
}

export async function updateBoardMember(id: string, data: any) {
  const { data: member, error } = await supabase
    .from('board_members')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating board member:', error);
    throw error;
  }

  return member;
}

export async function createBoardMember(data: any) {
  const { data: member, error } = await supabase
    .from('board_members')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating board member:', error);
    throw error;
  }

  return member;
}

export async function deleteBoardMember(id: string) {
  const { error } = await supabase
    .from('board_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting board member:', error);
    throw error;
  }
}