import { getDb } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { projects } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq, and, asc } from "drizzle-orm";

// GET — fetch approved cards for a project (position, caption, video)
export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db = getDb();
  const rows = await db.select({
    id: cards.id,
    position: cards.position,
    status: cards.status,
    descInstagram: cards.descInstagram,
    descTiktok: cards.descTiktok,
    descFacebook: cards.descFacebook,
    descYoutube: cards.descYoutube,
    videoPath: cards.videoPath,
    finalVideoPath: cards.finalVideoPath,
  })
    .from(cards)
    .where(and(
      eq(cards.projectId, projectId),
      eq(cards.status, "approved"),
    ))
    .orderBy(asc(cards.position));

  return Response.json(rows);
}
