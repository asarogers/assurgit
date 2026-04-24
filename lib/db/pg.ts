import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./pg-schema";
import * as relations from "./pg-relations";

const SCHEMA = { ...schema, ...relations };

let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle<typeof SCHEMA>> | null = null;

export function getPgDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL ?? "postgresql://localhost/pipeline";
    _client = postgres(url);
    _db = drizzle(_client, { schema: SCHEMA });
  }
  return _db;
}
