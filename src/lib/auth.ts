import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function registerUser(email: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'user' // Set the role in the user metadata
        }
      }
    });

    if (authError) {
      console.error('Registration error:', authError);
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create user');
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
      console.error('Authentication error:', error);
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    }

    if (!data.user) {
      throw new Error('No user data returned');
    }

    // Get the role from user metadata
    const role = data.user.user_metadata?.role || 'user';

    return {
      id: data.user.id,
      email: data.user.email,
      role: role
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