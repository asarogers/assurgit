import { getPgDb } from "@/lib/db/pg";
import { clients } from "@/lib/db/pg-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { id } = await params;
  const db = getPgDb();
  await db.delete(clients).where(eq(clients.id, id));
  return new Response(null, { status: 204 });
}
