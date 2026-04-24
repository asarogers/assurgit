-- Add top-level client entities so projects (batches) live under a named client
CREATE TABLE clients (
  id         TEXT    PRIMARY KEY NOT NULL,
  name       TEXT    NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- client_id nullable so existing projects are not broken (they show as orphans)
ALTER TABLE projects ADD COLUMN client_id TEXT REFERENCES clients(id) ON DELETE SET NULL;
