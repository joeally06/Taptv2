import { supabase } from './supabase';
import type { User } from '../types/database';

export async function authenticateUser(email: string, password: string): Promise<User> {
  try {
    const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) throw signInError;
    if (!session?.user) throw new Error('Authentication failed');

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw userError || new Error('Failed to get user data');

    const isAdmin = user.user_metadata?.role === 'admin';
    if (!isAdmin) throw new Error('Access denied: User is not an admin');

    // Set session cookie with secure flags
    const secure = window.location.protocol === 'https:';
    document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}${secure ? '; secure' : ''}; samesite=lax`;

    return {
      id: user.id,
      email: user.email || '',
      role: 'admin',
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
    // Clear session cookie
    document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=lax';
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    if (!session) throw new Error('No session to refresh');
    
    // Update session cookie
    const secure = window.location.protocol === 'https:';
    document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}${secure ? '; secure' : ''}; samesite=lax`;
    
    return session;
  } catch (error) {
    console.error('Session refresh error:', error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return !!session;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}