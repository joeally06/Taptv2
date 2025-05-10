import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.');
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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