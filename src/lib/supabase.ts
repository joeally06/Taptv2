import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.SUPABASE_URL || !import.meta.env.SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      storageKey: 'sb-access-token'
    }
  }
);