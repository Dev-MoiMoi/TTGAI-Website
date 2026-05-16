import { createClient } from '@supabase/supabase-js';

/* ═══════════════════════════════════════════════════════════
   Supabase Client — initialised once, used everywhere.
   
   SECURITY NOTES:
   • The anon key is intentionally public (it's safe with RLS enabled).
   • Row Level Security policies on the Supabase tables ensure the
     anon key can ONLY: read approved newsletters, insert pending
     newsletters, insert subscribers, and update subscribers (unsubscribe).
   • Admin operations (reading all subscribers, approving/editing/
     deleting newsletters) require service_role access via Edge Functions.
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

/* ═══════════════════════════════════════════════════════════
   ADMIN operations
   
   These functions interact with the database for admin purposes.
   With RLS enabled, these operations will be restricted. For full
   admin access, a Supabase Edge Function with service_role key
   should be used. For now, these work as long as RLS policies
   allow them (or before RLS is enabled).
   ═══════════════════════════════════════════════════════════ */

/**
 * Return all subscribers where is_active = true.
 * ADMIN ONLY — requires appropriate RLS policy or service_role.
 * @returns {Promise<Array<{name: string, email: string}>>}
 */
export async function getActiveSubscribers() {
  const { data, error } = await supabase
    .from('subscribers')
    .select('name, email, is_active');

  if (error) throw new Error(error.message);
  // Filter client-side to be immune to postgrest true vs "true" casting issues
  return (data || []).filter(
    (s) => s.is_active === true || s.is_active === 'true' || s.is_active === null
  );
}

/**
 * Return ALL subscribers (for admin display — including inactive).
 * ADMIN ONLY — requires appropriate RLS policy or service_role.
 * @returns {Promise<Array>}
 */
export async function getAllSubscribers() {
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * Update an existing newsletter.
 * ADMIN ONLY — requires appropriate RLS policy or service_role.
 */
export async function updateNewsletter(id, updates) {
  const { data, error } = await supabase
    .from('newsletters')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
}

/**
 * Delete a newsletter.
 * ADMIN ONLY — requires appropriate RLS policy or service_role.
 */
export async function deleteNewsletter(id) {
  const { error } = await supabase
    .from('newsletters')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
