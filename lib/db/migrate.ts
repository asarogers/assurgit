import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "content-approval.db");
const sqlite = new Database(dbPath);

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    token       TEXT NOT NULL UNIQUE,
    phase       TEXT NOT NULL DEFAULT 'transcript',
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cards (
    id                TEXT PRIMARY KEY,
    project_id        TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    position          INTEGER NOT NULL,
    transcript_v1     TEXT DEFAULT '',
    transcript_v2     TEXT,
    video_path        TEXT,
    final_video_path  TEXT,
    status            TEXT NOT NULL DEFAULT 'waiting',
    desc_instagram    TEXT DEFAULT '',
    desc_tiktok       TEXT DEFAULT '',
    desc_facebook     TEXT DEFAULT '',
    desc_youtube      TEXT DEFAULT '',
    created_at        INTEGER NOT NULL,
    updated_at        INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS review_sessions (
    id           TEXT PRIMARY KEY,
    project_id   TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    email        TEXT NOT NULL,
    denies_left  INTEGER NOT NULL DEFAULT 2,
    expires_at   INTEGER NOT NULL,
    completed_at INTEGER,
    created_at   INTEGER NOT NULL
  );
`);

console.log("Database migrated successfully.");
sqlite.close();
