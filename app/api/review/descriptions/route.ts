import { getPgDb } from "@/lib/db/pg";
import { cards, reviewSessions } from "@/lib/db/pg-schema";
import { validateReviewToken } from "@/lib/token";
import { eq, and } from "drizzle-orm";

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const db = getPgDb();
  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const session = (await db.select().from(reviewSessions).where(eq(reviewSessions.projectId, parsed.projectId)).limit(1))[0];

  if (!session) return Response.json({ error: "Session not found" }, { status: 404 });
  if (Date.now() > session.expiresAt) return Response.json({ error: "Link expired" }, { status: 410 });

  const { cardId, descInstagram, descTiktok, descFacebook, descYoutube } = await req.json() as { cardId: string; descInstagram?: string; descTiktok?: string; descFacebook?: string; descYoutube?: string };
  if (!cardId) return Response.json({ error: "cardId required" }, { status: 400 });

  const updates: Record<string, unknown> = { updatedAt: Date.now() };
  if (descInstagram !== undefined) updates.descInstagram = descInstagram;
  if (descTiktok    !== undefined) updates.descTiktok    = descTiktok;
  if (descFacebook  !== undefined) updates.descFacebook  = descFacebook;
  if (descYoutube   !== undefined) updates.descYoutube   = descYoutube;

  await db.update(cards)
    .set(updates)
    .where(and(eq(cards.id, cardId), eq(cards.projectId, parsed.projectId)));

  const card = (await db.select().from(cards).where(eq(cards.id, cardId)).limit(1))[0];
  return Response.json(card);
}
