import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id:            text("id").primaryKey(),
  name:          text("name").notNull(),
  token:         text("token").notNull().unique(),
  phase:         text("phase", { enum: ["transcript", "final_video"] })
                   .notNull()
                   .default("transcript"),
  createdAt:     integer("created_at").notNull(),
  updatedAt:     integer("updated_at").notNull(),
});

export const cards = sqliteTable("cards", {
  id:               text("id").primaryKey(),
  projectId:        text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  position:         integer("position").notNull(),

  transcriptV1:     text("transcript_v1").default(""),
  transcriptV2:     text("transcript_v2"),

  videoPath:        text("video_path"),
  finalVideoPath:   text("final_video_path"),

  status:           text("status", { enum: ["waiting", "approved", "denied"] })
                      .notNull()
                      .default("waiting"),

  descInstagram:    text("desc_instagram").default(""),
  descTiktok:       text("desc_tiktok").default(""),
  descFacebook:     text("desc_facebook").default(""),
  descYoutube:      text("desc_youtube").default(""),

  createdAt:        integer("created_at").notNull(),
  updatedAt:        integer("updated_at").notNull(),
});

export const reviewSessions = sqliteTable("review_sessions", {
  id:          text("id").primaryKey(),
  projectId:   text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  email:       text("email").notNull(),
  deniesLeft:  integer("denies_left").notNull().default(2),
  expiresAt:   integer("expires_at").notNull(),
  completedAt: integer("completed_at"),
  createdAt:   integer("created_at").notNull(),
});

export type Project      = typeof projects.$inferSelect;
export type Card         = typeof cards.$inferSelect;
export type ReviewSession = typeof reviewSessions.$inferSelect;
