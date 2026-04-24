import { getPgDb } from "@/lib/db/pg";
import { cards, projects, reviewSessions } from "@/lib/db/pg-schema";
import { validateReviewToken } from "@/lib/token";
import { sendDenialNotification } from "@/lib/email";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token  = searchParams.get("token");

  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const db = getPgDb();
  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const session = (await db.select().from(reviewSessions).where(eq(reviewSessions.projectId, parsed.projectId)).limit(1))[0];

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
    db.select().from(projects).where(eq(projects.id, parsed.projectId)).limit(1).then((r) => r[0]),
    db.select().from(cards).where(eq(cards.id, cardId)).limit(1).then((r) => r[0]),
  ]);

  sendDenialNotification({
    projectName: project?.name ?? parsed.projectId,
    clientEmail: session.email,
    cardPosition: card?.position ?? 0,
    deniesLeft:   newDeniesLeft,
  }).catch(() => {});

  return Response.json({ deniesLeft: newDeniesLeft });
}
