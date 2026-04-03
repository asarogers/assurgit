-- GBP queue: services and blogs to post
CREATE TABLE IF NOT EXISTS gbp_queue (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'service',   -- 'service' | 'blog'
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'posted'
  posted_at INTEGER,
  position INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(project_id, slug)
);

-- GBP posting schedule: random times per weekday per week
CREATE TABLE IF NOT EXISTS gbp_schedule (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL,  -- 1=Monday, 5=Friday
  time_1 TEXT NOT NULL,          -- HH:MM
  time_2 TEXT NOT NULL,          -- HH:MM
  week_of TEXT NOT NULL,         -- YYYY-MM-DD (Monday of week)
  created_at INTEGER NOT NULL,
  UNIQUE(project_id, day_of_week, week_of)
);
