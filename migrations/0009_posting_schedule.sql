-- Posting schedule: random times per project per platform, Mon-Fri
CREATE TABLE IF NOT EXISTS posting_schedule (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  platform TEXT NOT NULL DEFAULT 'instagram',
  day_of_week INTEGER NOT NULL,  -- 1=Monday, 5=Friday
  time_1 TEXT NOT NULL,          -- HH:MM format (24h)
  time_2 TEXT NOT NULL,          -- HH:MM format (24h)
  week_of TEXT NOT NULL,         -- ISO date of Monday for that week (YYYY-MM-DD)
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_schedule_project ON posting_schedule(project_id, platform, week_of);
