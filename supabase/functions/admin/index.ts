import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SignJWT, jwtVerify } from "npm:jose@5";

/**
 * TTGAI Admin Edge Function
 *
 * Runs server-side on Supabase Edge Functions with the SERVICE ROLE key
 * (auto-injected as SUPABASE_SERVICE_ROLE_KEY). It is the ONLY place that
 * reads subscribers or mutates newsletters as an admin, so the public anon
 * key can be locked down with Row Level Security.
 *
 * Secrets required:
 *   - ADMIN_PASSWORD_HASH   SHA-256 hex of the admin password (same value
 *                           that used to live in the browser bundle)
 *   - ADMIN_SESSION_SECRET  Random secret used to sign the short-lived JWT
 *   - SUPABASE_SERVICE_ROLE_KEY  Optional — auto-injected by the platform
 *                                when using the default createClient env keys
 *
 * Actions (query param `?action=`):
 *   - login             POST { passwordHash } -> { token, expiresIn }
 *   - subscribers       GET  (Bearer token)   -> all subscribers
 *   - newsletter:list   GET  (Bearer token)   -> all newsletters (incl. pending)
 *   - newsletter:create POST { title, author, ... } -> creates as 'approved'
 *   - newsletter:update POST { id, ...fields }      -> updates allowed fields
 *   - newsletter:delete POST { id }
 *   - siteImages:list   GET  (Bearer token)   -> all replaceable site image slots
 *   - siteImages:update POST { slug, image_url }    -> set/clear a slot's image
 *   - dashboard:stats   GET  (Bearer token)   -> aggregate KPIs for the admin dashboard
 */

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const adminPasswordHash = Deno.env.get("ADMIN_PASSWORD_HASH") ?? "";
const sessionSecret = Deno.env.get("ADMIN_SESSION_SECRET") ?? "";

const SESSION_TTL_SEC = 30 * 60; // 30 minutes

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

/* ── Helpers ─────────────────────────────────────────────── */

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/* In-memory brute-force limiter (per warm instance) — used as a fallback
   when the DB-backed limiter can't run (e.g. the rate-limit table has not
   been created yet). Once supabase-rls-policies.sql is applied, the table
   `admin_login_attempts` provides distributed limiting across instances. */
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 5 * 60 * 1000;
const ATTEMPTS_TABLE = "admin_login_attempts";
const loginAttempts = new Map<string, number[]>();

function inMemoryLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (loginAttempts.get(ip) || []).filter((t) => now - t < LOGIN_WINDOW_MS);
  if (stamps.length >= LOGIN_MAX_ATTEMPTS) {
    loginAttempts.set(ip, stamps);
    return true;
  }
  stamps.push(now);
  loginAttempts.set(ip, stamps);
  return false;
}

/* DB-backed limiter (shared across instances) — fail-open on error so a
   missing table never blocks legitimate logins. */
async function dbPruneAttempts(): Promise<void> {
  const cutoff = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();
  const { error } = await supabase.from(ATTEMPTS_TABLE).delete().lt("created_at", cutoff);
  if (error) throw error;
}

async function dbCountAttempts(ip: string): Promise<number> {
  const cutoff = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();
  const { count, error } = await supabase
    .from(ATTEMPTS_TABLE)
    .select("*", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", cutoff);
  if (error) throw error;
  return count ?? 0;
}

async function dbRecordAttempt(ip: string): Promise<void> {
  const { error } = await supabase.from(ATTEMPTS_TABLE).insert({ ip });
  if (error) throw error;
}

async function dbClearAttempts(ip: string): Promise<void> {
  const { error } = await supabase.from(ATTEMPTS_TABLE).delete().eq("ip", ip);
  if (error) throw error;
}

async function signToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SEC}s`)
    .sign(new TextEncoder().encode(sessionSecret));
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, new TextEncoder().encode(sessionSecret));
    return true;
  } catch {
    return false;
  }
}

async function requireAdmin(req: Request): Promise<{ ok: boolean; error?: string }> {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return { ok: false, error: "missing_token" };
  if (!(await isValidToken(token))) return { ok: false, error: "invalid_token" };
  return { ok: true };
}

/* Allowed newsletter columns — reject anything else to avoid surprises. */
const NEWSLETTER_FIELDS = [
  "title",
  "author",
  "batch_year",
  "school",
  "category",
  "volume_key",
  "excerpt",
  "date",
  "page_info",
  "image_url",
];

function pickNewsletterFields(body: Record<string, unknown>, allowStatus = false): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const key of NEWSLETTER_FIELDS) {
    if (typeof body[key] === "string") picked[key] = body[key];
  }
  if (allowStatus && (body.status === "approved" || body.status === "pending")) {
    picked.status = body.status;
  }
  return picked;
}

/* Only allow real http(s) image URLs — anything else (javascript:, data:, …)
   is coerced to "" so a slot reverts to its bundled fallback. */
function sanitizeImageUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  const v = value.trim();
  if (!v) return "";
  return /^https?:\/\/\S+$/i.test(v) ? v : "";
}

/* ── Handlers ────────────────────────────────────────────── */

async function handleLogin(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  const ip = clientIp(req);

  // Distributed rate limit first (fall back to per-instance if DB table missing).
  let dbLimit = true;
  let attempts = 0;
  try {
    await dbPruneAttempts();
    attempts = await dbCountAttempts(ip);
  } catch {
    dbLimit = false;
  }
  if (attempts >= LOGIN_MAX_ATTEMPTS || (!dbLimit && inMemoryLimited(ip))) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const passwordHash = typeof body.passwordHash === "string" ? body.passwordHash : "";
  if (!passwordHash || !adminPasswordHash || passwordHash !== adminPasswordHash) {
    if (dbLimit) {
      try { await dbRecordAttempt(ip); } catch { /* best effort */ }
    }
    return json({ ok: false, error: "invalid_credentials" }, 401);
  }

  if (dbLimit) {
    try { await dbClearAttempts(ip); } catch { /* best effort */ }
  }
  const token = await signToken();
  return json({ ok: true, data: { token, expiresIn: SESSION_TTL_SEC } });
}

async function handleSubscribers(): Promise<Response> {
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, data: data ?? [] });
}

async function handleNewsletterList(): Promise<Response> {
  const { data, error } = await supabase
    .from("newsletters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, data: data ?? [] });
}

async function handleNewsletterCreate(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const payload = pickNewsletterFields(body);
  if (!payload.title || !payload.author) {
    return json({ ok: false, error: "missing_required_fields" }, 400);
  }

  // Admin-created editions are always approved on creation.
  payload.status = "approved";
  // `image_url` is NOT NULL — default to "" when absent, sanitize when present.
  payload.image_url = sanitizeImageUrl(payload.image_url);

  const { data, error } = await supabase.from("newsletters").insert([payload]).select();
  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, data: data?.[0] });
}

async function handleNewsletterUpdate(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const id = body.id;
  if (!id) return json({ ok: false, error: "missing_id" }, 400);

  const updates = pickNewsletterFields(body, true);
  if (typeof body.image_url === "string") {
    updates.image_url = sanitizeImageUrl(body.image_url);
  }
  const { data, error } = await supabase.from("newsletters").update(updates).eq("id", id).select();
  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, data: data?.[0] });
}

async function handleNewsletterDelete(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const id = body.id;
  if (!id) return json({ ok: false, error: "missing_id" }, 400);

  const { error } = await supabase.from("newsletters").delete().eq("id", id);
  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, data: { id } });
}

async function handleSiteImagesList(): Promise<Response> {
  const { data, error } = await supabase
    .from("site_images")
    .select("*")
    .order("section", { ascending: true })
    .order("label", { ascending: true });

  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, data: data ?? [] });
}

async function handleSiteImagesUpdate(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  if (!slug) return json({ ok: false, error: "missing_slug" }, 400);

  const imageUrl = sanitizeImageUrl(body.image_url);

  const { data: existing, error: fetchError } = await supabase
    .from("site_images")
    .select("slug")
    .eq("slug", slug);
  if (fetchError) return json({ ok: false, error: fetchError.message }, 500);
  if (!existing || existing.length === 0) return json({ ok: false, error: "unknown_slug" }, 404);

  const { data, error } = await supabase
    .from("site_images")
    .update({ image_url: imageUrl, updated_at: new Date().toISOString() })
    .eq("slug", slug)
    .select();
  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, data: data?.[0] });
}

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString();
}

function todayStartIso(): string {
  return new Date().toISOString().slice(0, 10);
}

async function countRows(table: string, filter?: Record<string, unknown>): Promise<number> {
  const opts = { count: "exact" as const, head: true };
  let q = supabase.from(table).select("*", opts);
  if (filter) {
    for (const [col, val] of Object.entries(filter)) q = q.eq(col, val);
  }
  const { count, error } = await q;
  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function handleDashboardStats(): Promise<Response> {
  try {
    const [
      subsTotal,
      subsActive,
      recentSubs,
      nlsAll,
      imgAll,
    ] = await Promise.all([
      countRows("subscribers"),
      countRows("subscribers", { is_active: true }),
      supabase.from("subscribers").select("email, name, subscribed_at, is_active")
        .order("subscribed_at", { ascending: false }).limit(5),
      supabase.from("newsletters").select("*").order("created_at", { ascending: false }),
      supabase.from("site_images").select("slug, section, image_url"),
    ]);

    // Subscriber date-window counts.
    const [todayRes, weekRes, monthRes] = await Promise.all([
      supabase.from("subscribers").select("*", { count: "exact", head: true }).gte("subscribed_at", todayStartIso()),
      supabase.from("subscribers").select("*", { count: "exact", head: true }).gte("subscribed_at", isoDaysAgo(7)),
      supabase.from("subscribers").select("*", { count: "exact", head: true }).gte("subscribed_at", isoDaysAgo(30)),
    ]);
    if (todayRes.error || weekRes.error || monthRes.error || recentSubs.error || nlsAll.error || imgAll.error) {
      throw new Error(todayRes.error?.message || weekRes.error?.message || monthRes.error?.message
        || recentSubs.error?.message || nlsAll.error?.message || imgAll.error?.message);
    }

    const nls = nlsAll.data ?? [];
    const approved = nls.filter((n) => n.status === "approved").length;
    const pending = nls.filter((n) => n.status === "pending").length;

    const byCategory: Record<string, number> = {};
    const byBatch: Record<string, number> = {};
    for (const n of nls) {
      const cat = (n.category || "Uncategorized").trim();
      byCategory[cat] = (byCategory[cat] || 0) + 1;
      const batch = (n.batch_year || "Unknown").trim();
      byBatch[batch] = (byBatch[batch] || 0) + 1;
    }
    const sortByCount = (m: Record<string, number>) =>
      Object.entries(m).sort((a, b) => b[1] - a[1]).map(([label, count]) => ({ label, count }));

    const imgs = imgAll.data ?? [];
    const imgSections: Record<string, { filled: number; total: number }> = {};
    for (const img of imgs) {
      const sec = (img.section || "General").trim();
      if (!imgSections[sec]) imgSections[sec] = { filled: 0, total: 0 };
      imgSections[sec].total += 1;
      if (img.image_url) imgSections[sec].filled += 1;
    }

    return json({
      ok: true,
      data: {
        subscribers: {
          total: subsTotal,
          active: subsActive,
          newToday: todayRes.count ?? 0,
          newThisWeek: weekRes.count ?? 0,
          newThisMonth: monthRes.count ?? 0,
          recent: recentSubs.data ?? [],
        },
        newsletters: {
          total: nls.length,
          approved,
          pending,
          byCategory: sortByCount(byCategory),
          byBatch: sortByCount(byBatch),
          recent: nls.slice(0, 5),
        },
        siteImages: {
          total: imgs.length,
          filled: imgs.filter((i) => i.image_url).length,
          bySection: Object.entries(imgSections)
            .map(([section, v]) => ({ section, filled: v.filled, total: v.total }))
            .sort((a, b) => b.filled / Math.max(b.total, 1) - a.filled / Math.max(a.total, 1)),
        },
      },
    });
  } catch (err) {
    return json({ ok: false, error: err.message }, 500);
  }
}

/* ── Router ──────────────────────────────────────────────── */

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "";

  if (action === "login") {
    return await handleLogin(req);
  }

  const auth = await requireAdmin(req);
  if (!auth.ok) return json({ ok: false, error: auth.error }, 401);

  switch (action) {
    case "subscribers":
      return await handleSubscribers();
    case "newsletter:list":
      return await handleNewsletterList();
    case "newsletter:create":
      return await handleNewsletterCreate(req);
    case "newsletter:update":
      return await handleNewsletterUpdate(req);
    case "newsletter:delete":
      return await handleNewsletterDelete(req);
    case "siteImages:list":
      return await handleSiteImagesList();
    case "siteImages:update":
      return await handleSiteImagesUpdate(req);
    case "dashboard:stats":
      return await handleDashboardStats();
    default:
      return json({ ok: false, error: "unknown_action" }, 404);
  }
});
