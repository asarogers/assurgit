import { relations } from "drizzle-orm";
import { projects, cards, reviewSessions, onboardingSubmissions, onboardingFiles } from "./schema";
import { socialAccounts } from "./social-schema";

export const projectRelations = relations(projects, ({ many }) => ({
  cards:                  many(cards),
  reviewSessions:         many(reviewSessions),
  socialAccounts:         many(socialAccounts),
  onboardingSubmissions:  many(onboardingSubmissions),
  onboardingFiles:        many(onboardingFiles),
}));

export const onboardingSubmissionRelations = relations(onboardingSubmissions, ({ one }) => ({
  project: one(projects, { fields: [onboardingSubmissions.projectId], references: [projects.id] }),
}));

export const onboardingFileRelations = relations(onboardingFiles, ({ one }) => ({
  project: one(projects, { fields: [onboardingFiles.projectId], references: [projects.id] }),
}));

export const cardRelations = relations(cards, ({ one }) => ({
  project: one(projects, { fields: [cards.projectId], references: [projects.id] }),
}));

export const reviewSessionRelations = relations(reviewSessions, ({ one }) => ({
  project: one(projects, { fields: [reviewSessions.projectId], references: [projects.id] }),
}));
