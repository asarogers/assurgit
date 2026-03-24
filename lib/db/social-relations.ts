import { relations } from "drizzle-orm";
import { projects } from "./schema";
import { socialAccounts, scheduledPosts } from "./social-schema";

export const socialAccountRelations = relations(socialAccounts, ({ one, many }) => ({
  project:        one(projects,  { fields: [socialAccounts.projectId],       references: [projects.id] }),
  scheduledPosts: many(scheduledPosts),
}));

export const scheduledPostRelations = relations(scheduledPosts, ({ one }) => ({
  socialAccount: one(socialAccounts, { fields: [scheduledPosts.socialAccountId], references: [socialAccounts.id] }),
  project:       one(projects,       { fields: [scheduledPosts.projectId],        references: [projects.id] }),
}));
