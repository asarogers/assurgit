import { db } from "@/lib/db";
import { reviewSessions } from "@/lib/db/schema";
import { validateReviewToken } from "@/lib/token";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const parsed = validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const session = await db.query.reviewSessions.findFirst({
    where: (s, { eq }) => eq(s.projectId, parsed.projectId),
  });

  if (!session) return Response.json({ error: "No active session" }, { status: 404 });
  if (Date.now() > session.expiresAt) {
    return Response.json({ error: "Link expired" }, { status: 410 });
  }

  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, parsed.projectId),
    with:  { cards: { orderBy: (c, { asc }) => [asc(c.position)] } },
  });

  if (!project) return Response.json({ error: "Project not found" }, { status: 404 });

  return Response.json({
    project,
    session: {
      id:          session.id,
      deniesLeft:  session.deniesLeft,
      expiresAt:   session.expiresAt,
      completedAt: session.completedAt,
    },
  });
}
