import { supabase } from './supabase';
import type { User } from '../types/database';
import { AuthError } from './errors';

export async function authenticateUser(email: string, password: string): Promise<User> {
  try {
    const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) throw new AuthError(signInError.message);
    if (!session?.user) throw new AuthError('Authentication failed');

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new AuthError('Failed to get user data');

    const isAdmin = user.user_metadata?.role === 'admin';
    if (!isAdmin) throw new AuthError('Access denied: User is not an admin');

    return {
      id: user.id,
      email: user.email || '',
      role: 'admin',
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error instanceof AuthError ? error : new AuthError('Authentication failed');
  }
}

export async function signOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
    document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=lax';
  } catch (error) {
    console.error('Sign out error:', error);
    throw new AuthError('Failed to sign out');
  }
}

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw new AuthError(error.message);
    if (!session) throw new AuthError('No session to refresh');
    return session;
  } catch (error) {
    console.error('Session refresh error:', error);
    throw error instanceof AuthError ? error : new AuthError('Failed to refresh session');
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}