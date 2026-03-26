import { getDb } from "@/lib/db";
import { cards, projects, reviewSessions } from "@/lib/db/schema";
import { validateReviewToken } from "@/lib/token";
import { sendDenialNotification } from "@/lib/email";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token  = searchParams.get("token");

  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const db = getDb();
  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const session = await db.query.reviewSessions.findFirst({
    where: (s, { eq }) => eq(s.projectId, parsed.projectId),
  });

  if (!session) return Response.json({ error: "Session not found" }, { status: 404 });
  if (Date.now() > session.expiresAt) return Response.json({ error: "Link expired" }, { status: 410 });
  if (session.deniesLeft <= 0) return Response.json({ error: "No denials remaining" }, { status: 403 });

  const { cardId } = await req.json() as { cardId: string };
  if (!cardId) return Response.json({ error: "cardId required" }, { status: 400 });

  // Mark card denied
  await db.update(cards)
    .set({ status: "denied", updatedAt: Date.now() })
    .where(and(eq(cards.id, cardId), eq(cards.projectId, parsed.projectId)));

  // Decrement deny counter
  const newDeniesLeft = session.deniesLeft - 1;
  await db.update(reviewSessions)
    .set({ deniesLeft: newDeniesLeft })
    .where(eq(reviewSessions.id, session.id));

  const [project, card] = await Promise.all([
    db.query.projects.findFirst({ where: (p, { eq }) => eq(p.id, parsed.projectId) }),
    db.query.cards.findFirst({ where: (c, { eq }) => eq(c.id, cardId) }),
  ]);

  sendDenialNotification({
    projectName: project?.name ?? parsed.projectId,
    clientEmail: session.email,
    cardPosition: card?.position ?? 0,
    deniesLeft:   newDeniesLeft,
  }).catch(() => {});

  return Response.json({ deniesLeft: newDeniesLeft });
}
