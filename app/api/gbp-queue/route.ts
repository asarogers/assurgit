import { getDb } from "@/lib/db";
import { gbpQueue } from "@/lib/db/gbp-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq, and, asc } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET — fetch queue for a project (optionally filtered by status)
export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const status = searchParams.get("status"); // 'pending' | 'posted' | null (all)

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db = getDb();
  const conditions = [eq(gbpQueue.projectId, projectId)];
  if (status) conditions.push(eq(gbpQueue.status, status));

  const rows = await db.select().from(gbpQueue)
    .where(and(...conditions))
    .orderBy(asc(gbpQueue.position));

  return Response.json({ queue: rows });
}

// PATCH — mark an item as posted (called by Arnold after successful post)
export async function PATCH(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { id, status = "posted" } = await req.json() as { id: string; status?: string };
  if (!id) return Response.json({ error: "id required" }, { status: 400 });

  const db = getDb();
  await db.update(gbpQueue)
    .set({ status, postedAt: status === "posted" ? Date.now() : null })
    .where(eq(gbpQueue.id, id));

  return Response.json({ updated: true });
}
