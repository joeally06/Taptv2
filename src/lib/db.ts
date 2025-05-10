import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createHallOfFameNomination(data: {
  nominee_name: string;
  nominator_name: string;
  nominator_email: string;
  nomination_reason: string;
  district: string;
}) {
  const { data: nomination, error } = await supabase
    .from('hall_of_fame_nominations')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return nomination;
}