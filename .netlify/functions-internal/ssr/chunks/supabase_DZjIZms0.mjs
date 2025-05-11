import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xyzcompany.supabase.co";
const supabaseAnonKey = "your-anon-key";
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
