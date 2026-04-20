import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client for public use (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations only.
// On the browser SUPABASE_SERVICE_ROLE_KEY is undefined, so we return a Proxy
// that throws only if someone actually tries to use it client-side, instead of
// crashing at module load time.
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : (new Proxy({} as ReturnType<typeof createClient>, {
      get() {
        throw new Error(
          'supabaseAdmin is server-only and cannot be used in the browser.'
        );
      },
    }) as ReturnType<typeof createClient>);
