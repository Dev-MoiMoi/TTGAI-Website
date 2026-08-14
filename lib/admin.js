/**
 * TTGAI Admin API client.
 *
 * All admin operations (login, subscriber lists, newsletter CRUD) go through
 * the Supabase Edge Function at `supabase/functions/admin/index.ts`, which
 * holds the service-role key server-side. The browser never sees admin data
 * access — it only carries a short-lived JWT.
 *
 * Requires: VITE_SUPABASE_URL. Optionally override the function host with
 * VITE_SUPABASE_FUNCTIONS_URL (defaults to <ref>.functions.supabase.co).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL
  || (SUPABASE_URL ? SUPABASE_URL.replace(/\.supabase\.co$/, '.functions.supabase.co') : '');

export const ADMIN_FUNCTIONS_URL = FUNCTIONS_URL ? `${FUNCTIONS_URL}/admin` : '';

/**
 * Call the admin edge function.
 * @param {string} action   — action name (login, subscribers, newsletter:*)
 * @param {Object} options
 * @param {string} [options.token] — admin JWT (sent as Bearer header)
 * @param {Object} [options.body]  — JSON body
 * @param {string} [options.method]
 */
async function call(action, { token, body, method = 'POST' } = {}) {
  if (!ADMIN_FUNCTIONS_URL) throw new Error('admin_functions_not_configured');

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(
      `${ADMIN_FUNCTIONS_URL}?action=${encodeURIComponent(action)}`,
      { method, headers, body: body ? JSON.stringify(body) : undefined }
    );
  } catch (err) {
    throw new Error('network_error');
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = { ok: false, error: 'invalid_response' };
  }

  if (!res.ok || data.ok === false) {
    const err = new Error(data.error || `request_failed_${res.status}`);
    err.code = data.error;
    err.status = res.status;
    throw err;
  }

  return data.data;
}

export const adminApi = {
  /** @param {string} passwordHash — SHA-256 of the admin password */
  login: (passwordHash) => call('login', { body: { passwordHash } }),

  getAllSubscribers: (token) => call('subscribers', { token, method: 'GET' }),

  listNewsletters: (token) => call('newsletter:list', { token, method: 'GET' }),

  createNewsletter: (token, payload) => call('newsletter:create', { token, body: payload }),

  updateNewsletter: (token, id, updates) => call('newsletter:update', { token, body: { id, ...updates } }),

  deleteNewsletter: (token, id) => call('newsletter:delete', { token, body: { id } }),
};
