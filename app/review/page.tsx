import type { Metadata } from "next";
import { ReviewClient } from "@/components/review/ReviewClient";
import { getDb } from "@/lib/db";
import { projects, cards, reviewSessions } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://assurgit.com/review',
  },
};

interface Props {
  searchParams: Promise<{ token?: string }>;
}

async function getSession(token: string) {
  const db = getDb();

  const [projectRows] = await db
    .select()
    .from(projects)
    .where(eq(projects.token, token))
    .limit(1);

  if (!projectRows) return null;

  const [cardRows, sessionRows] = await Promise.all([
    db.select().from(cards).where(eq(cards.projectId, projectRows.id)).orderBy(asc(cards.position)),
    db.select().from(reviewSessions).where(eq(reviewSessions.projectId, projectRows.id)).limit(1),
  ]);

  const session = sessionRows[0];
  if (!session || Date.now() > session.expiresAt) return null;

  return { project: { ...projectRows, cards: cardRows }, session };
}

export default async function ReviewPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">Invalid review link.</p>
      </div>
    );
  }

  const data = await getSession(token);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">
          This review link is invalid or has expired.
        </p>
      </div>
    );
  }

  const { project, session } = data;

  return (
    <ReviewClient
      token={token}
      projectName={project.name}
      phase={project.phase}
      cards={project.cards}
      session={{
        id:          session.id,
        deniesLeft:  session.deniesLeft,
        expiresAt:   session.expiresAt,
        completedAt: session.completedAt,
      }}
    />
  );
}
