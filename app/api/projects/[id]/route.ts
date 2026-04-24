import { getPgDb } from "@/lib/db/pg";
import { projects, cards } from "@/lib/db/pg-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id } = await params;
  const db = getPgDb();
  const project = (await db.select().from(projects).where(eq(projects.id, id)).limit(1))[0];

  if (!project) return Response.json({ error: "Not found" }, { status: 404 });

  const projectCards = await db.select().from(cards).where(eq(cards.projectId, id)).orderBy(asc(cards.position));
  return Response.json({ ...project, cards: projectCards });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id }  = await params;
  const db      = getPgDb();
  const body    = await req.json() as Record<string, unknown>;
  const updates: Record<string, unknown> = { updatedAt: Date.now() };

  if (body.name  !== undefined) updates.name  = body.name;
  if (body.phase !== undefined) updates.phase = body.phase;

  await db.update(projects).set(updates).where(eq(projects.id, id));

  const project = (await db.select().from(projects).where(eq(projects.id, id)).limit(1))[0];

  const projectCards = await db.select().from(cards).where(eq(cards.projectId, id)).orderBy(asc(cards.position));
  return Response.json({ ...project, cards: projectCards });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id } = await params;
  const db = getPgDb();
  await db.delete(projects).where(eq(projects.id, id));
  return Response.json({ ok: true });
}
