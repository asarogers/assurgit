import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema         from "./schema";
import * as relations      from "./relations";
import * as socialSchema   from "./social-schema";
import * as socialRelations from "./social-relations";
import * as scheduleSchema from "./schedule-schema";

export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema: { ...schema, ...relations, ...socialSchema, ...socialRelations, ...scheduleSchema } });
}
