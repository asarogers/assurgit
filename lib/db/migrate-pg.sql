-- Migration: Move assurgit project/schedule tables to local PostgreSQL (pipeline database)
-- Run with: psql pipeline -f lib/db/migrate-pg.sql

CREATE TABLE IF NOT EXISTS clients (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  created_at  BIGINT NOT NULL,
  updated_at  BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id           TEXT PRIMARY KEY,
  client_id    TEXT REFERENCES clients(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  token        TEXT NOT NULL UNIQUE,
  phase        TEXT NOT NULL DEFAULT 'transcript',
  client_email TEXT,
  created_at   BIGINT NOT NULL,
  updated_at   BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS cards (
  id                    TEXT PRIMARY KEY,
  project_id            TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  position              INTEGER NOT NULL,
  transcript_v1         TEXT DEFAULT '',
  transcript_v2         TEXT,
  video_path            TEXT,
  final_video_path      TEXT,
  status                TEXT NOT NULL DEFAULT 'waiting',
  desc_instagram        TEXT DEFAULT '',
  desc_tiktok           TEXT DEFAULT '',
  desc_facebook         TEXT DEFAULT '',
  desc_youtube          TEXT DEFAULT '',
  desc_youtube_title    TEXT DEFAULT '',
  desc_reddit_title     TEXT DEFAULT '',
  desc_reddit_subreddit TEXT DEFAULT '',
  created_at            BIGINT NOT NULL,
  updated_at            BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS review_sessions (
  id           TEXT PRIMARY KEY,
  project_id   TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  email        TEXT NOT NULL,
  denies_left  INTEGER NOT NULL DEFAULT 2,
  expires_at   BIGINT NOT NULL,
  completed_at BIGINT,
  created_at   BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id              TEXT PRIMARY KEY,
  project_id      TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  business_name   TEXT DEFAULT '',
  website         TEXT DEFAULT '',
  what_you_do     TEXT DEFAULT '',
  target_audience TEXT DEFAULT '',
  cta_goal        TEXT DEFAULT '',
  platforms       TEXT DEFAULT '',
  voice_style     TEXT DEFAULT '',
  voice_examples  TEXT DEFAULT '',
  voice_avoid     TEXT DEFAULT '',
  link_instagram  TEXT DEFAULT '',
  link_tiktok     TEXT DEFAULT '',
  link_linkedin   TEXT DEFAULT '',
  link_youtube    TEXT DEFAULT '',
  link_other      TEXT DEFAULT '',
  extra_notes     TEXT DEFAULT '',
  submitted_at    BIGINT,
  created_at      BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS onboarding_files (
  id         TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filename   TEXT NOT NULL,
  file_url   TEXT NOT NULL,
  file_size  INTEGER,
  category   TEXT NOT NULL DEFAULT 'other',
  created_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS scheduled_posts (
  id                   TEXT PRIMARY KEY,
  project_id           TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  social_account_id    TEXT NOT NULL,
  title                TEXT,
  caption              TEXT NOT NULL DEFAULT '',
  subreddit            TEXT,
  visibility           TEXT,
  media_url            TEXT,
  media_type           TEXT NOT NULL DEFAULT 'IMAGE',
  scheduled_for        BIGINT,
  status               TEXT NOT NULL DEFAULT 'draft',
  published_at         BIGINT,
  ig_container_id      TEXT,
  ig_media_id          TEXT,
  metadata             TEXT,
  error_message        TEXT,
  metrics              TEXT,
  metrics_views        INTEGER,
  metrics_likes        INTEGER,
  metrics_comments     INTEGER,
  metrics_shares       INTEGER,
  metrics_impressions  INTEGER,
  metrics_reach        INTEGER,
  metrics_saved        INTEGER,
  metrics_upvotes      INTEGER,
  metrics_upvote_ratio REAL,
  metrics_fetched_at   BIGINT,
  created_at           BIGINT NOT NULL,
  updated_at           BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS posting_schedule (
  id         TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  platform   TEXT NOT NULL DEFAULT 'all',
  day_of_week INTEGER NOT NULL,
  time       TEXT NOT NULL,
  week_of    TEXT NOT NULL,
  created_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS gbp_queue (
  id         TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type       TEXT NOT NULL DEFAULT 'service',
  slug       TEXT NOT NULL,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  url        TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending',
  image_path TEXT,
  posted_at  BIGINT,
  position   INTEGER NOT NULL,
  created_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS gbp_schedule (
  id         TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL,
  times      TEXT NOT NULL,
  week_of    TEXT NOT NULL,
  created_at BIGINT NOT NULL
);
