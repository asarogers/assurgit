import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { projects } from "./schema";

export const postingSchedule = sqliteTable("posting_schedule", {
  id:         text("id").primaryKey(),
  projectId:  text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  platform:   text("platform").notNull().default("all"),
  dayOfWeek:  integer("day_of_week").notNull(),  // 1=Monday, 5=Friday
  time:       text("time").notNull(),            // HH:MM (24h) — one row per slot
  weekOf:     text("week_of").notNull(),          // YYYY-MM-DD (Monday)
  createdAt:  integer("created_at").notNull(),
});

export type PostingSchedule = typeof postingSchedule.$inferSelect;
