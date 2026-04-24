import { getPgDb } from "@/lib/db/pg";
import { reviewSessions, cards, projects } from "@/lib/db/pg-schema";
import { validateReviewToken } from "@/lib/token";
import { asc, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const db = getPgDb();
  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const session = (await db.select().from(reviewSessions).where(eq(reviewSessions.projectId, parsed.projectId)).limit(1))[0];

  if (!session) return Response.json({ error: "No active session" }, { status: 404 });
  if (Date.now() > session.expiresAt) {
    return Response.json({ error: "Link expired" }, { status: 410 });
  }

  const project = (await db.select().from(projects).where(eq(projects.id, parsed.projectId)).limit(1))[0];

  if (!project) return Response.json({ error: "Project not found" }, { status: 404 });

  const projectCards = await db.select().from(cards).where(eq(cards.projectId, parsed.projectId)).orderBy(asc(cards.position));

  return Response.json({
    project: { ...project, cards: projectCards },
    session: {
      id:          session.id,
      deniesLeft:  session.deniesLeft,
      expiresAt:   session.expiresAt,
      completedAt: session.completedAt,
    },
  });
}
