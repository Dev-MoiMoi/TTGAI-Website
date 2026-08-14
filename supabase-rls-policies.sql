-- ═══════════════════════════════════════════════════════════
-- TTGAI — Supabase Row Level Security (RLS) Policies
-- ═══════════════════════════════════════════════════════════
-- 
-- Run this SQL in your Supabase Dashboard → SQL Editor.
-- This locks down the database so the public anon key can only
-- perform safe operations. Admin operations will be restricted.
--
-- IMPORTANT: Test on your development database first!
-- ═══════════════════════════════════════════════════════════

-- ────────────────────────────────────────────
-- Step 0: Admin login brute-force protection table
-- Used by supabase/functions/admin to rate-limit login attempts
-- across all Edge Function instances. Only the service role reads it.
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ip text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_login_attempts_ip_created_idx
  ON admin_login_attempts (ip, created_at);

-- ────────────────────────────────────────────
-- Step 1: Enable RLS on all tables
-- ────────────────────────────────────────────

ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────
-- Step 1b: Drop EVERY existing policy on these tables.
-- RLS is permissive: ANY matching policy (including old dashboard
-- quick-create ones like "Enable read access for all users") lets the
-- anon key through. We reset first, then recreate ours below.
-- ────────────────────────────────────────────

DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('newsletters', 'subscribers')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- ────────────────────────────────────────────
-- Step 2: Newsletter policies
-- ────────────────────────────────────────────

-- Public can only READ approved newsletters
DROP POLICY IF EXISTS "Public can read approved newsletters" ON newsletters;
CREATE POLICY "Public can read approved newsletters"
  ON newsletters FOR SELECT
  USING (status = 'approved');

-- Public can INSERT new submissions (must be 'pending')
DROP POLICY IF EXISTS "Public can submit pending newsletters" ON newsletters;
CREATE POLICY "Public can submit pending newsletters"
  ON newsletters FOR INSERT
  WITH CHECK (status = 'pending');

-- Service role bypasses RLS automatically, but explicit policy for clarity
DROP POLICY IF EXISTS "Service role full access on newsletters" ON newsletters;
CREATE POLICY "Service role full access on newsletters"
  ON newsletters FOR ALL
  USING (auth.role() = 'service_role');

-- ────────────────────────────────────────────
-- Step 3: Subscriber policies
-- ────────────────────────────────────────────

-- Public can INSERT (subscribe)
DROP POLICY IF EXISTS "Public can subscribe" ON subscribers;
CREATE POLICY "Public can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- Public can UPDATE their own record to unsubscribe (only set is_active=false)
DROP POLICY IF EXISTS "Public can unsubscribe" ON subscribers;
CREATE POLICY "Public can unsubscribe"
  ON subscribers FOR UPDATE
  USING (true)
  WITH CHECK (is_active = false);

-- NO public SELECT policy = subscribers list is protected
-- The admin panel will need service_role or an Edge Function to read subscribers.

-- Service role has full access
DROP POLICY IF EXISTS "Service role full access on subscribers" ON subscribers;
CREATE POLICY "Service role full access on subscribers"
  ON subscribers FOR ALL
  USING (auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════
-- VERIFICATION QUERIES (run after applying the policies above)
-- ═══════════════════════════════════════════════════════════

-- Check that RLS is enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies:
-- SELECT tablename, policyname, cmd, qual FROM pg_policies WHERE schemaname = 'public';
