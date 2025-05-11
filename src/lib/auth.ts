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
    
    // First try to sign in
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Authentication error:', authError);
      throw authError;
    }

    if (!authData.user) {
      console.error('No user data returned');
      throw new Error('Authentication failed');
    }

    console.log('Authentication successful:', authData.user);

    // Get user metadata including role
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Error getting user data:', userError);
      throw new Error('Failed to get user data');
    }

    // Check if user has admin role in metadata
    const isAdmin = user.user_metadata?.role === 'admin';
    if (!isAdmin) {
      console.error('User is not an admin');
      throw new Error('Access denied');
    }

    return {
      id: user.id,
      email: user.email,
      role: 'admin'
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