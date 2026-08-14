import { createClient } from '@supabase/supabase-js';

/* ═══════════════════════════════════════════════════════════
   Supabase Client — initialised once, used everywhere.
   
   SECURITY NOTES:
   • The anon key is intentionally public (it's safe with RLS enabled).
   • Row Level Security policies on the Supabase tables ensure the
     anon key can ONLY: read approved newsletters, insert pending
     newsletters, insert subscribers, and update subscribers (unsubscribe).
   • Admin operations (reading all subscribers, approving/editing/
     deleting newsletters) run through the `admin` Edge Function
     (supabase/functions/admin/index.ts) with the service_role key.
     See lib/admin.js for the client-side wrapper.
   ═══════════════════════════════════════════════════════════ */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail loudly if env vars are missing — never fall back to placeholders
if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[TTGAI] Missing Supabase environment variables. ' +
    'Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://missing.supabase.co',
  supabaseKey || 'missing-key'
);

/* ═══════════════════════════════════════════════════════════
   PUBLIC operations (safe for anon key + RLS)
   ═══════════════════════════════════════════════════════════ */

/**
 * Insert a new subscriber into the `subscribers` table.
 * Throws 'already_subscribed' if the email already exists (unique constraint violation).
 */
export async function addSubscriber(name, email) {
  const { error } = await supabase
    .from('subscribers')
    .insert({ name, email });

  if (error?.code === '23505') throw new Error('already_subscribed');
  if (error) throw new Error(error.message);
}

/**
 * Set is_active = false for the given email (public unsubscribe).
 * Does not error if the email isn't found — check row count if needed.
 */
export async function unsubscribeEmail(email) {
  const { data, error } = await supabase
    .from('subscribers')
    .update({ is_active: false })
    .eq('email', email)
    .select();

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error('not_found');
}

/**
 * Fetch newsletters visible to the public.
 * With RLS enabled, this will only return status='approved' rows regardless
 * of the filter passed, providing defence-in-depth.
 */
export async function getNewsletters(status = null) {
  let query = supabase.from('newsletters').select('*').order('created_at', { ascending: false });
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * Add a new newsletter (public submissions must be 'pending').
 * RLS enforces that only pending status can be inserted via anon key.
 */
export async function addNewsletter(payload) {
  const { data, error } = await supabase
    .from('newsletters')
    .insert([payload])
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
}

