import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function authenticateUser(email: string, password: string) {
  try {
    console.log('Attempting authentication for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Supabase auth error:', error);
      throw error;
    }

    if (!data.user) {
      console.error('No user data returned');
      throw new Error('Authentication failed');
    }

    console.log('Authentication successful:', data.user);

    // Get user metadata including role
    const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !currentUser) {
      console.error('Error getting user data:', userError);
      throw new Error('Failed to get user data');
    }

    return {
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.user_metadata?.role || 'user'
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function isAdmin(userId: string) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return user.user_metadata?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}