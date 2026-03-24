CREATE TABLE IF NOT EXISTS social_accounts (
  id               TEXT PRIMARY KEY,
  project_id       TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  platform         TEXT NOT NULL DEFAULT 'instagram',
  account_id       TEXT NOT NULL,
  account_name     TEXT NOT NULL,
  account_avatar   TEXT,
  access_token     TEXT NOT NULL,
  token_expires_at INTEGER NOT NULL,
  created_at       INTEGER NOT NULL,
  updated_at       INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_social_accounts_project_platform
  ON social_accounts(project_id, platform);

CREATE INDEX IF NOT EXISTS idx_social_accounts_project
  ON social_accounts(project_id);

CREATE TABLE IF NOT EXISTS scheduled_posts (
  id                TEXT PRIMARY KEY,
  project_id        TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  social_account_id TEXT NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  caption           TEXT NOT NULL DEFAULT '',
  media_url         TEXT,
  media_type        TEXT NOT NULL DEFAULT 'IMAGE',
  scheduled_for     INTEGER,
  status            TEXT NOT NULL DEFAULT 'draft',
  published_at      INTEGER,
  ig_container_id   TEXT,
  ig_media_id       TEXT,
  error_message     TEXT,
  created_at        INTEGER NOT NULL,
  updated_at        INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_scheduled_posts_project
  ON scheduled_posts(project_id);

CREATE INDEX IF NOT EXISTS idx_scheduled_posts_status
  ON scheduled_posts(status, scheduled_for);
