import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id } = await params;
  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, id),
    with:  { cards: { orderBy: (c, { asc }) => [asc(c.position)] } },
  });

  if (!project) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(project);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id }  = await params;
  const body    = await req.json();
  const updates: Record<string, unknown> = { updatedAt: Date.now() };

  if (body.name  !== undefined) updates.name  = body.name;
  if (body.phase !== undefined) updates.phase = body.phase;

  await db.update(projects).set(updates).where(eq(projects.id, id));

  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, id),
    with:  { cards: { orderBy: (c, { asc }) => [asc(c.position)] } },
  });
  return Response.json(project);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id } = await params;
  await db.delete(projects).where(eq(projects.id, id));
  return Response.json({ ok: true });
}
