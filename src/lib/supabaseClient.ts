import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_API_KEY!,
  {
    auth: {
      persistSession: true,      // keep session across reloads
      autoRefreshToken: true,    // refresh before expiry
    },
  }
);
