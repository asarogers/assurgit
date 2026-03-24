import { getDb } from "@/lib/db";
import { scheduledPosts } from "@/lib/db/social-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { id } = await params;
  const body   = await req.json() as Record<string, unknown>;
  const db     = getDb();
  const now    = Date.now();

  const allowed = ["caption", "mediaUrl", "mediaType", "scheduledFor", "status"];
  const updates: Record<string, unknown> = { updatedAt: now };
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  if (updates.scheduledFor && !updates.status) updates.status = "scheduled";

  await db.update(scheduledPosts).set(updates).where(eq(scheduledPosts.id, id));
  const post = await db.query.scheduledPosts.findFirst({ where: (p, { eq }) => eq(p.id, id) });
  return Response.json(post);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { id } = await params;
  const db     = getDb();
  await db.delete(scheduledPosts).where(eq(scheduledPosts.id, id));
  return Response.json({ ok: true });
}
