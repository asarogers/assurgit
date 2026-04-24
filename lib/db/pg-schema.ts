import { pgTable, text, integer, bigint, real } from "drizzle-orm/pg-core";

const ts  = (name: string) => bigint(name, { mode: "number" }).notNull();
const tsN = (name: string) => bigint(name, { mode: "number" });

export const clients = pgTable("clients", {
  id:            text("id").primaryKey(),
  name:          text("name").notNull(),
  location:      text("location"),
  gbpBusinessId: text("gbp_business_id"),
  website:       text("website"),
  createdAt:     ts("created_at"),
  updatedAt:     ts("updated_at"),
});

export const projects = pgTable("projects", {
  id:          text("id").primaryKey(),
  clientId:    text("client_id").references(() => clients.id, { onDelete: "set null" }),
  name:        text("name").notNull(),
  token:       text("token").notNull().unique(),
  phase:       text("phase").notNull().default("transcript"),
  clientEmail: text("client_email"),
  createdAt:   ts("created_at"),
  updatedAt:   ts("updated_at"),
});

export const cards = pgTable("cards", {
  id:                  text("id").primaryKey(),
  projectId:           text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  position:            integer("position").notNull(),
  transcriptV1:        text("transcript_v1").default(""),
  transcriptV2:        text("transcript_v2"),
  videoPath:           text("video_path"),
  finalVideoPath:      text("final_video_path"),
  status:              text("status").notNull().default("waiting"),
  descInstagram:       text("desc_instagram").default(""),
  descTiktok:          text("desc_tiktok").default(""),
  descFacebook:        text("desc_facebook").default(""),
  descYoutube:         text("desc_youtube").default(""),
  descYoutubeTitle:    text("desc_youtube_title").default(""),
  descRedditTitle:     text("desc_reddit_title").default(""),
  descRedditSubreddit: text("desc_reddit_subreddit").default(""),
  createdAt:           ts("created_at"),
  updatedAt:           ts("updated_at"),
});

export const reviewSessions = pgTable("review_sessions", {
  id:          text("id").primaryKey(),
  projectId:   text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  email:       text("email").notNull(),
  deniesLeft:  integer("denies_left").notNull().default(2),
  expiresAt:   ts("expires_at"),
  completedAt: tsN("completed_at"),
  createdAt:   ts("created_at"),
});

export const onboardingSubmissions = pgTable("onboarding_submissions", {
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
  submittedAt:    tsN("submitted_at"),
  createdAt:      ts("created_at"),
});

export const onboardingFiles = pgTable("onboarding_files", {
  id:        text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  filename:  text("filename").notNull(),
  fileUrl:   text("file_url").notNull(),
  fileSize:  integer("file_size"),
  category:  text("category").notNull().default("other"),
  createdAt: ts("created_at"),
});

export const scheduledPosts = pgTable("scheduled_posts", {
  id:                 text("id").primaryKey(),
  projectId:          text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  socialAccountId:    text("social_account_id").notNull(),
  title:              text("title"),
  caption:            text("caption").notNull().default(""),
  subreddit:          text("subreddit"),
  visibility:         text("visibility"),
  mediaUrl:           text("media_url"),
  mediaType:          text("media_type").notNull().default("IMAGE"),
  scheduledFor:       tsN("scheduled_for"),
  status:             text("status").notNull().default("draft"),
  publishedAt:        tsN("published_at"),
  igContainerId:      text("ig_container_id"),
  igMediaId:          text("ig_media_id"),
  metadata:           text("metadata"),
  errorMessage:       text("error_message"),
  metrics:            text("metrics"),
  metricsViews:       integer("metrics_views"),
  metricsLikes:       integer("metrics_likes"),
  metricsComments:    integer("metrics_comments"),
  metricsShares:      integer("metrics_shares"),
  metricsImpressions: integer("metrics_impressions"),
  metricsReach:       integer("metrics_reach"),
  metricsSaved:       integer("metrics_saved"),
  metricsUpvotes:     integer("metrics_upvotes"),
  metricsUpvoteRatio: real("metrics_upvote_ratio"),
  metricsFetchedAt:   tsN("metrics_fetched_at"),
  createdAt:          ts("created_at"),
  updatedAt:          ts("updated_at"),
});

export const postingSchedule = pgTable("posting_schedule", {
  id:        text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  platform:  text("platform").notNull().default("all"),
  dayOfWeek: integer("day_of_week").notNull(),
  time:      text("time").notNull(),
  weekOf:    text("week_of").notNull(),
  createdAt: ts("created_at"),
});

export const gbpQueue = pgTable("gbp_queue", {
  id:        text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  type:      text("type").notNull().default("service"),
  slug:      text("slug").notNull(),
  title:     text("title").notNull(),
  body:      text("body").notNull(),
  url:       text("url").notNull(),
  status:    text("status").notNull().default("pending"),
  imagePath: text("image_path"),
  postedAt:  tsN("posted_at"),
  position:  integer("position").notNull(),
  createdAt: ts("created_at"),
});

export const gbpSchedule = pgTable("gbp_schedule", {
  id:        text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  dayOfWeek: integer("day_of_week").notNull(),
  times:     text("times").notNull(),
  weekOf:    text("week_of").notNull(),
  createdAt: ts("created_at"),
});

export type Client               = typeof clients.$inferSelect;
export type Project              = typeof projects.$inferSelect;
export type Card                 = typeof cards.$inferSelect;
export type ReviewSession        = typeof reviewSessions.$inferSelect;
export type OnboardingSubmission = typeof onboardingSubmissions.$inferSelect;
export type OnboardingFile       = typeof onboardingFiles.$inferSelect;
export type ScheduledPost        = typeof scheduledPosts.$inferSelect;
export type PostingSchedule      = typeof postingSchedule.$inferSelect;
export type GbpQueueItem         = typeof gbpQueue.$inferSelect;
export type GbpScheduleRow       = typeof gbpSchedule.$inferSelect;
