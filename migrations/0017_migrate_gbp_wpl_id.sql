-- Migrate Well Prepped Life from legacy shortcode id to canonical Postgres project slug.
-- Rationale: The rest of the infrastructure (public.project_configs.project,
-- public.nap_profiles.client_id, <client> PG schemas, /repo/<client_id>/ folders) all
-- key off the slug 'wellpreppedlife'. Keeping D1 on a different id ('wpl_001') made
-- preflight rely on a fragile business_name fallback and would trip up any future
-- automation that joins PG + D1. This migration aligns the two.
--
-- Safety:
-- - Single-row UPDATE, no DELETE/DROP
-- - gbp_locations has no FK references from other D1 tables (verified via sqlite_master)
-- - Reversible: UPDATE gbp_locations SET id='wpl_001' WHERE id='wellpreppedlife'
-- - Seed in 0016_gbp_locations.sql is also updated in the same commit so fresh deploys
--   land directly on the canonical id.

UPDATE gbp_locations
SET id         = 'wellpreppedlife',
    updated_at = strftime('%s','now') * 1000
WHERE id = 'wpl_001';
