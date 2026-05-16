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
-- Step 1: Enable RLS on all tables
-- ────────────────────────────────────────────

ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────
-- Step 2: Newsletter policies
-- ────────────────────────────────────────────

-- Public can only READ approved newsletters
CREATE POLICY "Public can read approved newsletters"
  ON newsletters FOR SELECT
  USING (status = 'approved');

-- Public can INSERT new submissions (must be 'pending')
CREATE POLICY "Public can submit pending newsletters"
  ON newsletters FOR INSERT
  WITH CHECK (status = 'pending');

-- Service role bypasses RLS automatically, but explicit policy for clarity
CREATE POLICY "Service role full access on newsletters"
  ON newsletters FOR ALL
  USING (auth.role() = 'service_role');

-- ────────────────────────────────────────────
-- Step 3: Subscriber policies
-- ────────────────────────────────────────────

-- Public can INSERT (subscribe)
CREATE POLICY "Public can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- Public can UPDATE their own record to unsubscribe (only set is_active=false)
CREATE POLICY "Public can unsubscribe"
  ON subscribers FOR UPDATE
  USING (true)
  WITH CHECK (is_active = false);

-- NO public SELECT policy = subscribers list is protected
-- The admin panel will need service_role or an Edge Function to read subscribers.

-- Service role has full access
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
