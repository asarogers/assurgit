import { getPgDb } from "@/lib/db/pg";
import { cards } from "@/lib/db/pg-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq, desc, asc } from "drizzle-orm";

// POST /api/cards
// Appends N new empty card slots to an existing project.
// Body: { projectId: string, count: number }
// Returns the newly created cards.
export async function POST(req: Request) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { projectId, count } = await req.json() as { projectId: string; count: number };

  if (!projectId) {
    return Response.json({ error: "projectId is required" }, { status: 400 });
  }

  const n   = Math.min(Math.max(count ?? 1, 1), 20);
  const db  = getPgDb();
  const now = Date.now();

  // Find the current highest position in this project
  const existing = await db
    .select({ position: cards.position })
    .from(cards)
    .where(eq(cards.projectId, projectId))
    .orderBy(desc(cards.position))
    .limit(1);

  const startPos = (existing[0]?.position ?? 0) + 1;

  const newCards = Array.from({ length: n }, (_, i) => ({
    id:        nanoid(),
    projectId,
    position:  startPos + i,
    createdAt: now,
    updatedAt: now,
  }));

  await db.insert(cards).values(newCards);

  const inserted = await db
    .select()
    .from(cards)
    .where(eq(cards.projectId, projectId))
    .orderBy(asc(cards.position));

  return Response.json(inserted, { status: 201 });
}
