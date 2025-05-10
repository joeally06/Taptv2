import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function authenticateUser(email: string, password: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error) {
    console.error('Authentication error:', error);
    return null;
  }

  return data;
}

export async function isAdmin(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }

  return data?.role === 'admin';
}