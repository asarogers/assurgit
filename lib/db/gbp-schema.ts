import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { projects } from "./schema";

export const gbpQueue = sqliteTable("gbp_queue", {
  id:        text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  type:      text("type").notNull().default("service"), // 'service' | 'blog'
  slug:      text("slug").notNull(),
  title:     text("title").notNull(),
  body:      text("body").notNull(),
  url:       text("url").notNull(),
  status:    text("status").notNull().default("pending"), // 'pending' | 'posted'
  imagePath: text("image_path"),
  postedAt:  integer("posted_at"),
  position:  integer("position").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const gbpSchedule = sqliteTable("gbp_schedule", {
  id:        text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  dayOfWeek: integer("day_of_week").notNull(),
  time1:     text("time_1").notNull(),
  time2:     text("time_2").notNull(),
  weekOf:    text("week_of").notNull(),
  createdAt: integer("created_at").notNull(),
});

export type GbpQueueItem = typeof gbpQueue.$inferSelect;
export type GbpSchedule  = typeof gbpSchedule.$inferSelect;
