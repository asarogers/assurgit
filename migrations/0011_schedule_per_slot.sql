-- Migrate posting_schedule to one row per time slot (dynamic count)
ALTER TABLE posting_schedule RENAME TO posting_schedule_old;

CREATE TABLE IF NOT EXISTS posting_schedule (
  id         TEXT    PRIMARY KEY,
  project_id TEXT    NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  platform   TEXT    NOT NULL DEFAULT 'all',
  day_of_week INTEGER NOT NULL,  -- 1=Monday, 5=Friday
  time       TEXT    NOT NULL,   -- HH:MM (24h)
  week_of    TEXT    NOT NULL,   -- YYYY-MM-DD (Monday of week)
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_schedule_project_new ON posting_schedule(project_id, platform, week_of);

-- Migrate existing rows: each old row becomes two new rows (time_1, time_2)
INSERT INTO posting_schedule (id, project_id, platform, day_of_week, time, week_of, created_at)
  SELECT id || '-1', project_id, platform, day_of_week, time_1, week_of, created_at
  FROM posting_schedule_old WHERE time_1 != '';

INSERT INTO posting_schedule (id, project_id, platform, day_of_week, time, week_of, created_at)
  SELECT id || '-2', project_id, platform, day_of_week, time_2, week_of, created_at
  FROM posting_schedule_old WHERE time_2 != '';

DROP TABLE posting_schedule_old;
