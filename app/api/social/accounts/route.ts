import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { socialAccounts } from "@/lib/db/social-schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db       = getDb();
  const accounts = await db.select().from(socialAccounts).where(eq(socialAccounts.projectId, projectId));

  return Response.json(accounts);
}
