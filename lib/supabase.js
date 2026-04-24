import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key-placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

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
 * Return all subscribers where is_active = true.
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
 * Set is_active = false for the given email.
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
 * Fetch all newsletters, optionally filtered by status ('pending' or 'approved').
 * If status is not provided, returns all newsletters (for admin).
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
 * Add a new newsletter (defaults to 'pending').
 */
export async function addNewsletter(payload) {
  const { data, error } = await supabase
    .from('newsletters')
    .insert([payload])
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
}

/**
 * Update an existing newsletter.
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
 */
export async function deleteNewsletter(id) {
  const { error } = await supabase
    .from('newsletters')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
