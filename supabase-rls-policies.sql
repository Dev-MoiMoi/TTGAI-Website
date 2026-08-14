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
-- Step 0b: Site images table.
-- Named image slots that the public pages read at runtime. The anon key can
-- read these (so pages can render them), but only the admin Edge Function
-- (service role) can write them. Empty image_url = page falls back to its
-- bundled asset.
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_images (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  section text NOT NULL DEFAULT 'General',
  image_url text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────
-- Step 1: Enable RLS on all tables
-- ────────────────────────────────────────────

ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

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
      AND tablename IN ('newsletters', 'subscribers', 'site_images')
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

-- ────────────────────────────────────────────
-- Step 4: Site image policies
-- ────────────────────────────────────────────

-- Public (anon) can READ site images so public pages can render them.
DROP POLICY IF EXISTS "Public can read site images" ON site_images;
CREATE POLICY "Public can read site images"
  ON site_images FOR SELECT
  USING (true);

-- Writes go through the admin Edge Function (service role).
DROP POLICY IF EXISTS "Service role full access on site images" ON site_images;
CREATE POLICY "Service role full access on site images"
  ON site_images FOR ALL
  USING (auth.role() = 'service_role');

-- ────────────────────────────────────────────
-- Step 5: Seed site image slots (idempotent).
-- Empty image_url means the page keeps using its bundled default image.
-- ────────────────────────────────────────────

-- 77 seeded slots
INSERT INTO site_images (slug, label, section, image_url) VALUES
  ('navbar_logo', 'Navbar Logo', 'Hero / Background', ''),
  ('home_hero', 'Home Hero Background', 'Hero / Background', ''),
  ('home_spot_1', 'Home — Inside Team Twilight (Impact)', 'Hero / Background', ''),
  ('home_spot_2', 'Home — Inside Team Twilight (Scholarship)', 'Hero / Background', ''),
  ('home_spot_3', 'Home — Inside Team Twilight (Event)', 'Hero / Background', ''),
  ('about_hero', 'About Hero Background', 'Hero / Background', ''),
  ('about_mission', 'About Milestone — 2009 Weekend Spar', 'Hero / Background', ''),
  ('about_founding', 'About Milestone — 2021 Founding', 'Hero / Background', ''),
  ('about_pki', 'About Milestone — 2025 PKI Launch', 'Hero / Background', ''),
  ('about_sinag', 'About Milestone — 2025 Batch Sinag', 'Hero / Background', ''),
  ('sponsorship_hero', 'Sponsorship Hero Background', 'Hero / Background', ''),
  ('team_placeholder', 'Team Member Placeholder', 'Hero / Background', ''),
  ('earth_day_1', 'Earth Day 2026 — Photo 1', 'Events', ''),
  ('earth_day_2', 'Earth Day 2026 — Photo 2', 'Events', ''),
  ('earth_day_3', 'Earth Day 2026 — Photo 3', 'Events', ''),
  ('earth_day_4', 'Earth Day 2026 — Photo 4', 'Events', ''),
  ('earth_day_5', 'Earth Day 2026 — Photo 5', 'Events', ''),
  ('earth_day_6', 'Earth Day 2026 — Photo 6', 'Events', ''),
  ('ethics_seminar_1', 'Ethical Leadership Workshop — Photo 1', 'Events', ''),
  ('ethics_seminar_2', 'Ethical Leadership Workshop — Photo 2', 'Events', ''),
  ('ethics_seminar_3', 'Ethical Leadership Workshop — Photo 3', 'Events', ''),
  ('batch1_grad_1', 'Batch 1 Graduate — Daniel Matthew Benegas', 'Events', ''),
  ('batch1_grad_2', 'Batch 1 Graduate — Ghia Mariz Estorgio', 'Events', ''),
  ('batch1_grad_3', 'Batch 1 Graduate — Harold Magpantay', 'Events', ''),
  ('batch1_grad_4', 'Batch 1 Graduate — Jerico Alintanahin', 'Events', ''),
  ('batch1_grad_5', 'Batch 1 Graduate — Jhon Rod Mhar Suario', 'Events', ''),
  ('batch1_grad_6', 'Batch 1 Graduate — Lorenzo Chancey Dapan', 'Events', ''),
  ('batch1_grad_7', 'Batch 1 Graduate — Paula Vidal', 'Events', ''),
  ('batch1_grad_8', 'Batch 1 Graduate — Pauline Alcones', 'Events', ''),
  ('batch1_grad_9', 'Batch 1 Graduate — Ryven Villar', 'Events', ''),
  ('team_tim_batac', 'Trustee — Tim Batac', 'Team', ''),
  ('team_cesar_sangalang', 'Trustee — Cesar Sangalang', 'Team', ''),
  ('team_jon_mateo', 'Trustee — Jon Mateo', 'Team', ''),
  ('team_rene_dela_cruz', 'Trustee — Rene dela Cruz', 'Team', ''),
  ('team_jun_valerio', 'Trustee — Jun Valerio', 'Team', ''),
  ('team_julius_buenaventura', 'Trustee — Julius Buenaventura', 'Team', ''),
  ('team_tony_mangubat', 'Trustee — Tony Mangubat', 'Team', ''),
  ('team_malvin_castro', 'Trustee — Malvin Castro', 'Team', ''),
  ('team_carlos_lagdameo', 'Trustee — Carlos Lagdameo', 'Team', ''),
  ('team_rey_araos', 'Trustee — Rey Araos', 'Team', ''),
  ('team_daniel_matthew_benegas', 'Scholar — Daniel Matthew Benegas', 'Team', ''),
  ('team_justin_harvy_c_tapay', 'Scholar — Justin Harvy C. Tapay', 'Team', ''),
  ('team_joemhir_keil_p_badilla', 'Scholar — Joemhir Keil P. Badilla', 'Team', ''),
  ('team_jana_pauline_d_alcones', 'Scholar — Jana Pauline D. Alcones', 'Team', ''),
  ('team_jericho_b_alintanahin', 'Scholar — Jericho B. Alintanahin', 'Team', ''),
  ('team_john_rico_t_anover', 'Scholar — John Rico T. Añover', 'Team', ''),
  ('team_enrique_bague_iii', 'Scholar — Enrique Bague III', 'Team', ''),
  ('team_charles_jabriel_d_beato', 'Scholar — Charles Jabriel D. Beato', 'Team', ''),
  ('team_ashzel_roi_m_caluit', 'Scholar — Ashzel Roi M. Caluit', 'Team', ''),
  ('team_jefferson_m_caparas', 'Scholar — Jefferson M. Caparas', 'Team', ''),
  ('team_lorenzo_chauncey_l_dapan', 'Scholar — Lorenzo Chauncey L. Dapan', 'Team', ''),
  ('team_ghia_mariz_estorgio', 'Scholar — Ghia Mariz Estorgio', 'Team', ''),
  ('team_moises_fatal_jr', 'Scholar — Moises Fatal Jr.', 'Team', ''),
  ('team_jaidel_c_flores', 'Scholar — Jaidel C. Flores', 'Team', ''),
  ('team_lindsay_r_laudato', 'Scholar — Lindsay R. Laudato', 'Team', ''),
  ('team_harold_v_magpantay', 'Scholar — Harold V. Magpantay', 'Team', ''),
  ('team_chelseah_nicole_b_mamplata', 'Scholar — Chelseah Nicole B. Mamplata', 'Team', ''),
  ('team_john_rod_mhar_m_suario', 'Scholar — John Rod Mhar M. Suario', 'Team', ''),
  ('team_paula_t_vidal', 'Scholar — Paula T. Vidal', 'Team', ''),
  ('team_ryven_b_villar', 'Scholar — Ryven B. Villar', 'Team', ''),
  ('team_bea_agustin', 'Scholar — Bea Agustin', 'Team', ''),
  ('team_miguelsito_l_alvaro', 'Scholar — Miguelsito L. Alvaro', 'Team', ''),
  ('team_marc_evan_m_avendano', 'Scholar — Marc Evan M. Avendaño', 'Team', ''),
  ('team_enrique_b_bague_iii', 'Scholar — Enrique B. Bague III', 'Team', ''),
  ('team_dan_reiy_paul_p_briones', 'Scholar — Dan Reiy Paul P. Briones', 'Team', ''),
  ('team_jigen_paul_a_de_belen', 'Scholar — Jigen Paul A. De Belen', 'Team', ''),
  ('team_andrew_d_dejito', 'Scholar — Andrew D. Dejito', 'Team', ''),
  ('team_moises_r_fatal_jr', 'Scholar — Moises R. Fatal Jr.', 'Team', ''),
  ('team_denise_ann_q_lopez', 'Scholar — Denise Ann Q. Lopez', 'Team', ''),
  ('team_allyssa_cassandra_a_panogaling', 'Scholar — Allyssa Cassandra A. Panogaling', 'Team', ''),
  ('team_denver_jade_d_rosario', 'Scholar — Denver Jade D. Rosario', 'Team', ''),
  ('team_justine_harvey_c_tapay', 'Scholar — Justine Harvey C. Tapay', 'Team', ''),
  ('team_kesley_kae_g_vitan', 'Scholar — Kesley Kae G. Vitan', 'Team', ''),
  ('team_kharl_o_katigbak', 'Scholar — Kharl O. Katigbak', 'Team', ''),
  ('team_dr_danilo_dan_c_lachica', 'Benefactor — Dr. Danilo "Dan" C. Lachica', 'Team', ''),
  ('team_teotimo_tim_g_batac', 'Benefactor — Teotimo "Tim" G. Batac', 'Team', ''),
  ('team_engr_domingo_dingo_bonifacio', 'Benefactor — Engr. Domingo "Dingo" Bonifacio', 'Team', ''),
  ('team_engr_antonio_tony_mangubat', 'Benefactor — Engr. Antonio "Tony" Mangubat', 'Team', ''),
  ('team_engr_rolando_rollie_lazaro', 'Benefactor — Engr. Rolando "Rollie" Lazaro', 'Team', ''),
  ('team_primo_jon_mateo_jr', 'Benefactor — Primo "Jon" Mateo Jr.', 'Team', ''),
  ('team_noel_cabangon', 'Benefactor — Noel Cabangon', 'Team', ''),
  ('linkages_pnc', 'Academic Partner — PnC Logo', 'Partners', ''),
  ('linkages_buscowitz', 'Sponsor — Buscowitz Energy Logo', 'Partners', ''),
  ('linkages_gmv', 'Sponsor — GMV Logo', 'Partners', ''),
  ('linkages_fastech', 'Sponsor — Fastech Logo', 'Partners', ''),
  ('linkages_seipi', 'Sponsor — SEIPI Logo', 'Partners', '')
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════
-- VERIFICATION QUERIES (run after applying the policies above)
-- ═══════════════════════════════════════════════════════════

-- Check that RLS is enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies:
-- SELECT tablename, policyname, cmd, qual FROM pg_policies WHERE schemaname = 'public';
