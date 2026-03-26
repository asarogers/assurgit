import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { projects } from "./schema";

export const socialAccounts = sqliteTable("social_accounts", {
  id:              text("id").primaryKey(),
  projectId:       text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  platform:        text("platform", { enum: ["instagram", "facebook", "tiktok", "reddit", "youtube", "pinterest", "bluesky", "threads"] }).notNull().default("instagram"),
  accountId:       text("account_id").notNull(),
  accountName:     text("account_name").notNull(),
  accountAvatar:   text("account_avatar"),
  accessToken:     text("access_token").notNull(),
  refreshToken:    text("refresh_token"),
  tokenExpiresAt:  integer("token_expires_at").notNull(),
  createdAt:       integer("created_at").notNull(),
  updatedAt:       integer("updated_at").notNull(),
});

export const scheduledPosts = sqliteTable("scheduled_posts", {
  id:              text("id").primaryKey(),
  projectId:       text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  socialAccountId: text("social_account_id").notNull().references(() => socialAccounts.id, { onDelete: "cascade" }),
  title:           text("title"),
  caption:         text("caption").notNull().default(""),
  subreddit:       text("subreddit"),
  visibility:      text("visibility", { enum: ["public", "unlisted", "private"] }),
  mediaUrl:        text("media_url"),
  mediaType:       text("media_type", { enum: ["IMAGE", "VIDEO", "REEL", "SHORT"] }).notNull().default("IMAGE"),
  scheduledFor:    integer("scheduled_for"),
  status:          text("status", { enum: ["draft", "scheduled", "published", "failed"] }).notNull().default("draft"),
  publishedAt:     integer("published_at"),
  igContainerId:   text("ig_container_id"),
  igMediaId:       text("ig_media_id"),
  metadata:        text("metadata"),        // JSON blob for platform-specific settings (TikTok privacy, etc.)
  errorMessage:    text("error_message"),
  metrics:         text("metrics"),
  createdAt:       integer("created_at").notNull(),
  updatedAt:       integer("updated_at").notNull(),
});

export type SocialAccount = typeof socialAccounts.$inferSelect;
export type ScheduledPost = typeof scheduledPosts.$inferSelect;
