import { getPgDb } from "@/lib/db/pg";
import { projects, cards } from "@/lib/db/pg-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { generateReviewToken } from "@/lib/token";
import { DEFAULT_CARDS_PER_PROJECT, MAX_CARDS_PER_PROJECT } from "@/lib/constants";
import { nanoid } from "nanoid";
import { asc, desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const db = getPgDb();
  const all = await db.select().from(projects).orderBy(desc(projects.createdAt));
  return Response.json(all);
}

export async function POST(req: Request) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { name, cardCount, clientId } = await req.json() as { name: string; cardCount?: number; clientId?: string };
  const db        = getPgDb();
  const now       = Date.now();
  const projectId = nanoid();
  const token     = generateReviewToken(projectId);
  const count     = Math.min(Math.max(cardCount ?? DEFAULT_CARDS_PER_PROJECT, 1), MAX_CARDS_PER_PROJECT);

  await db.insert(projects).values({
    id:        projectId,
    clientId:  clientId ?? null,
    name:      name ?? "Untitled Batch",
    token,
    phase:     "transcript",
    createdAt: now,
    updatedAt: now,
  });

  // Seed N empty cards
  const cardRows = Array.from({ length: count }, (_, i) => ({
    id:        nanoid(),
    projectId,
    position:  i + 1,
    createdAt: now,
    updatedAt: now,
  }));
  await db.insert(cards).values(cardRows);

  const project = (await db.select().from(projects).where(eq(projects.id, projectId)).limit(1))[0];

  const projectCards = await db.select().from(cards).where(eq(cards.projectId, projectId)).orderBy(asc(cards.position));
  return Response.json({ ...project, cards: projectCards }, { status: 201 });
}
