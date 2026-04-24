import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const socialAccounts = sqliteTable("social_accounts", {
  id:             text("id").primaryKey(),
  projectId:      text("project_id").notNull(),
  clientId:       text("client_id"),
  platform:       text("platform", { enum: ["instagram", "facebook", "tiktok", "reddit", "youtube", "pinterest", "bluesky", "threads"] }).notNull().default("instagram"),
  accountId:      text("account_id").notNull(),
  accountName:    text("account_name").notNull(),
  accountAvatar:  text("account_avatar"),
  accessToken:    text("access_token").notNull(),
  refreshToken:   text("refresh_token"),
  tokenExpiresAt: integer("token_expires_at").notNull(),
  createdAt:      integer("created_at").notNull(),
  updatedAt:      integer("updated_at").notNull(),
});

export type SocialAccount = typeof socialAccounts.$inferSelect;
