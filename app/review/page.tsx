import type { Metadata } from "next";
import { ReviewClient } from "@/components/review/ReviewClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
import { getDb } from "@/lib/db";
import { asc } from "drizzle-orm";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

async function getSession(token: string) {
  const db = getDb();

  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.token, token),
    with:  { cards: { orderBy: (c) => [asc(c.position)] } },
  });

  if (!project) return null;

  const session = await db.query.reviewSessions.findFirst({
    where: (s, { eq }) => eq(s.projectId, project.id),
  });

  if (!session || Date.now() > session.expiresAt) return null;

  return { project, session };
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
