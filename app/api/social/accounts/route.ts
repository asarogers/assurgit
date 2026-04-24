import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getPgDb } from "@/lib/db/pg";
import { projects } from "@/lib/db/pg-schema";
import { socialAccounts } from "@/lib/db/social-schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const pgDb = getPgDb();
  const [project] = await pgDb.select({ clientId: projects.clientId }).from(projects).where(eq(projects.id, projectId)).limit(1);

  const d1Db = getDb();
  const accounts = project?.clientId
    ? await d1Db.select().from(socialAccounts).where(eq(socialAccounts.clientId, project.clientId))
    : await d1Db.select().from(socialAccounts).where(eq(socialAccounts.projectId, projectId));

  return Response.json(accounts);
}
