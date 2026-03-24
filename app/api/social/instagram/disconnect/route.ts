import { getDb } from "@/lib/db";
import { socialAccounts } from "@/lib/db/social-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { socialAccountId } = await req.json() as { socialAccountId: string };
  if (!socialAccountId) return Response.json({ error: "socialAccountId required" }, { status: 400 });

  const db = getDb();
  await db.delete(socialAccounts).where(eq(socialAccounts.id, socialAccountId));
  return Response.json({ ok: true });
}
