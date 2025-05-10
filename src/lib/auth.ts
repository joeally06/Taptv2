import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function registerUser(email: string, password: string) {
  try {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Registration error:', authError);
      throw new Error(authError.message);
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
          password: '', // Don't store the actual password
          role: 'user', // Default role
        }
      ]);

    if (userError) {
      console.error('Error creating user record:', userError);
      throw new Error('Failed to create user record');
    }

    return {
      id: authData.user.id,
      email: authData.user.email,
      role: 'user'
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }
      console.error('Authentication error:', error);
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('No user data returned');
    }

    // Get user role from the users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (userError) {
      console.error('Error fetching user role:', userError);
      throw new Error('Failed to fetch user data');
    }

    return {
      id: data.user.id,
      email: data.user.email,
      role: userData.role
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function isAdmin(userId: string) {
  try {
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
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      console.error('Reset password error:', error);
      throw new Error('Failed to send password reset email');
    }

    return true;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
}