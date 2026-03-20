import { relations } from "drizzle-orm";
import { projects, cards, reviewSessions } from "./schema";

export const projectRelations = relations(projects, ({ many }) => ({
  cards:          many(cards),
  reviewSessions: many(reviewSessions),
}));

export const cardRelations = relations(cards, ({ one }) => ({
  project: one(projects, { fields: [cards.projectId], references: [projects.id] }),
}));

export const reviewSessionRelations = relations(reviewSessions, ({ one }) => ({
  project: one(projects, { fields: [reviewSessions.projectId], references: [projects.id] }),
}));
