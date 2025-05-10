import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function registerUser(email: string, password: string) {
  // First create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error('Registration error:', authError);
    throw authError;
  }

  if (!authData.user) {
    throw new Error('Failed to create user');
  }

  // Then create the user record in our users table
  const { error: userError } = await supabase
    .from('users')
    .insert([
      {
        id: authData.user.id,
        email: authData.user.email,
        role: 'user', // Default role
      }
    ]);

  if (userError) {
    console.error('Error creating user record:', userError);
    throw userError;
  }

  return {
    id: authData.user.id,
    email: authData.user.email,
    role: 'user'
  };
}

export async function authenticateUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Authentication error:', error);
    return null;
  }

  // Get user role from the users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (userError) {
    console.error('Error fetching user role:', userError);
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email,
    role: userData.role
  };
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

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });

  if (error) {
    console.error('Reset password error:', error);
    throw error;
  }

  return true;
}