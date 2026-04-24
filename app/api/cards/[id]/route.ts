import { getPgDb } from "@/lib/db/pg";
import { cards } from "@/lib/db/pg-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id } = await params;
  const db     = getPgDb();
  const body   = await req.json() as Record<string, unknown>;
  const updates: Record<string, unknown> = { updatedAt: Date.now() };

  const allowed = [
    "transcriptV1", "transcriptV2", "status",
    "descInstagram", "descTiktok", "descFacebook", "descYoutube", "descYoutubeTitle", "descRedditTitle", "descRedditSubreddit",
    "videoPath", "finalVideoPath",
  ];

  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key] ?? null;
  }

  // When transcriptV1 is revised on a denied card, reset it to waiting
  // so the client sees it as a fresh card needing review, not still flagged.
  if (body.transcriptV1 !== undefined && !body.status) {
    const existing = (await db.select().from(cards).where(eq(cards.id, id)).limit(1))[0];
    if (existing?.status === "denied") {
      updates.status = "waiting";
    }
  }

  await db.update(cards).set(updates).where(eq(cards.id, id));

  const card = (await db.select().from(cards).where(eq(cards.id, id)).limit(1))[0];
  return Response.json(card);
}
