import { getDb } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id } = await params;
  const db     = getDb();
  const body   = await req.json() as Record<string, unknown>;
  const updates: Record<string, unknown> = { updatedAt: Date.now() };

  const allowed = [
    "transcriptV1", "transcriptV2", "status",
    "descInstagram", "descTiktok", "descFacebook", "descYoutube",
  ];

  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  await db.update(cards).set(updates).where(eq(cards.id, id));

  const card = await db.query.cards.findFirst({ where: (c, { eq }) => eq(c.id, id) });
  return Response.json(card);
}
