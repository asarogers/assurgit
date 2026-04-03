import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id:            text("id").primaryKey(),
  name:          text("name").notNull(),
  token:         text("token").notNull().unique(),
  phase:         text("phase", { enum: ["transcript", "final_video"] })
                   .notNull()
                   .default("transcript"),
  clientEmail:   text("client_email"),
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
  descYoutubeTitle:     text("desc_youtube_title").default(""),
  descRedditTitle:      text("desc_reddit_title").default(""),
  descRedditSubreddit:  text("desc_reddit_subreddit").default(""),

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

export const onboardingSubmissions = sqliteTable("onboarding_submissions", {
  id:             text("id").primaryKey(),
  projectId:      text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  businessName:   text("business_name").default(""),
  website:        text("website").default(""),
  whatYouDo:      text("what_you_do").default(""),
  targetAudience: text("target_audience").default(""),
  ctaGoal:        text("cta_goal").default(""),
  platforms:      text("platforms").default(""),
  voiceStyle:     text("voice_style").default(""),
  voiceExamples:  text("voice_examples").default(""),
  voiceAvoid:     text("voice_avoid").default(""),
  linkInstagram:  text("link_instagram").default(""),
  linkTiktok:     text("link_tiktok").default(""),
  linkLinkedin:   text("link_linkedin").default(""),
  linkYoutube:    text("link_youtube").default(""),
  linkOther:      text("link_other").default(""),
  extraNotes:     text("extra_notes").default(""),
  submittedAt:    integer("submitted_at"),
  createdAt:      integer("created_at").notNull(),
});

export const onboardingFiles = sqliteTable("onboarding_files", {
  id:        text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  filename:  text("filename").notNull(),
  fileUrl:   text("file_url").notNull(),
  fileSize:  integer("file_size"),
  category:  text("category").notNull().default("other"),
  createdAt: integer("created_at").notNull(),
});

export type Project               = typeof projects.$inferSelect;
export type Card                  = typeof cards.$inferSelect;
export type ReviewSession         = typeof reviewSessions.$inferSelect;
export type OnboardingSubmission  = typeof onboardingSubmissions.$inferSelect;
export type OnboardingFile        = typeof onboardingFiles.$inferSelect;
