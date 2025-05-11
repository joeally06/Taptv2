import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tjxnjhjkxldhupitkvqk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeG5qaGpreGxkaHVwaXRrdnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDcxOTIsImV4cCI6MjA2MjQ4MzE5Mn0.w2O2vurDZWYuKMOvXPgOW1TBiVGvJg4E8ujDM4EUbws";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: "sb-access-token",
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce"
  },
  global: {
    headers: {
      "X-Client-Info": "tapt-web@1.0.0"
    }
  }
});
export {
  supabase as s
};
