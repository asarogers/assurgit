CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id               TEXT PRIMARY KEY,
  project_id       TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  business_name    TEXT DEFAULT '',
  website          TEXT DEFAULT '',
  what_you_do      TEXT DEFAULT '',
  target_audience  TEXT DEFAULT '',
  cta_goal         TEXT DEFAULT '',
  platforms        TEXT DEFAULT '',
  voice_style      TEXT DEFAULT '',
  voice_examples   TEXT DEFAULT '',
  voice_avoid      TEXT DEFAULT '',
  link_instagram   TEXT DEFAULT '',
  link_tiktok      TEXT DEFAULT '',
  link_linkedin    TEXT DEFAULT '',
  link_youtube     TEXT DEFAULT '',
  link_other       TEXT DEFAULT '',
  extra_notes      TEXT DEFAULT '',
  submitted_at     INTEGER,
  created_at       INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS onboarding_files (
  id          TEXT PRIMARY KEY,
  project_id  TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filename    TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  file_size   INTEGER,
  category    TEXT NOT NULL DEFAULT 'other',
  created_at  INTEGER NOT NULL
);
