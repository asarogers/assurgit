import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { projects } from "./schema";

export const socialAccounts = sqliteTable("social_accounts", {
  id:              text("id").primaryKey(),
  projectId:       text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  platform:        text("platform", { enum: ["instagram", "facebook", "tiktok", "reddit"] }).notNull().default("instagram"),
  accountId:       text("account_id").notNull(),
  accountName:     text("account_name").notNull(),
  accountAvatar:   text("account_avatar"),
  accessToken:     text("access_token").notNull(),
  tokenExpiresAt:  integer("token_expires_at").notNull(),
  createdAt:       integer("created_at").notNull(),
  updatedAt:       integer("updated_at").notNull(),
});

export const scheduledPosts = sqliteTable("scheduled_posts", {
  id:              text("id").primaryKey(),
  projectId:       text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  socialAccountId: text("social_account_id").notNull().references(() => socialAccounts.id, { onDelete: "cascade" }),
  caption:         text("caption").notNull().default(""),
  mediaUrl:        text("media_url"),
  mediaType:       text("media_type", { enum: ["IMAGE", "VIDEO", "REEL"] }).notNull().default("IMAGE"),
  scheduledFor:    integer("scheduled_for"),
  status:          text("status", { enum: ["draft", "scheduled", "published", "failed"] }).notNull().default("draft"),
  publishedAt:     integer("published_at"),
  igContainerId:   text("ig_container_id"),
  igMediaId:       text("ig_media_id"),
  errorMessage:    text("error_message"),
  createdAt:       integer("created_at").notNull(),
  updatedAt:       integer("updated_at").notNull(),
});

export type SocialAccount = typeof socialAccounts.$inferSelect;
export type ScheduledPost = typeof scheduledPosts.$inferSelect;
