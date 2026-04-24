import { relations } from "drizzle-orm";
import {
  clients, projects, cards, reviewSessions,
  onboardingSubmissions, onboardingFiles,
  scheduledPosts, postingSchedule, gbpQueue, gbpSchedule,
} from "./pg-schema";

export const clientRelations = relations(clients, ({ many }) => ({
  projects: many(projects),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  client:                one(clients, { fields: [projects.clientId], references: [clients.id] }),
  cards:                 many(cards),
  reviewSessions:        many(reviewSessions),
  onboardingSubmissions: many(onboardingSubmissions),
  onboardingFiles:       many(onboardingFiles),
  scheduledPosts:        many(scheduledPosts),
  postingSchedule:       many(postingSchedule),
  gbpQueue:              many(gbpQueue),
  gbpSchedule:           many(gbpSchedule),
}));

export const cardRelations = relations(cards, ({ one }) => ({
  project: one(projects, { fields: [cards.projectId], references: [projects.id] }),
}));

export const reviewSessionRelations = relations(reviewSessions, ({ one }) => ({
  project: one(projects, { fields: [reviewSessions.projectId], references: [projects.id] }),
}));

export const onboardingSubmissionRelations = relations(onboardingSubmissions, ({ one }) => ({
  project: one(projects, { fields: [onboardingSubmissions.projectId], references: [projects.id] }),
}));

export const onboardingFileRelations = relations(onboardingFiles, ({ one }) => ({
  project: one(projects, { fields: [onboardingFiles.projectId], references: [projects.id] }),
}));

export const scheduledPostRelations = relations(scheduledPosts, ({ one }) => ({
  project: one(projects, { fields: [scheduledPosts.projectId], references: [projects.id] }),
}));
