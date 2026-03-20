import { db } from "@/lib/db";
import { projects, cards } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { generateReviewToken } from "@/lib/token";
import { CARDS_PER_PROJECT } from "@/lib/constants";
import { nanoid } from "nanoid";
import { desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const all = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
  });
  return Response.json(all);
}

export async function POST(req: Request) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { name } = await req.json();
  const now       = Date.now();
  const projectId = nanoid();
  const token     = generateReviewToken(projectId);

  await db.insert(projects).values({
    id:        projectId,
    name:      name ?? "Untitled Project",
    token,
    phase:     "transcript",
    createdAt: now,
    updatedAt: now,
  });

  // Seed 5 empty cards
  const cardRows = Array.from({ length: CARDS_PER_PROJECT }, (_, i) => ({
    id:        nanoid(),
    projectId,
    position:  i + 1,
    createdAt: now,
    updatedAt: now,
  }));
  await db.insert(cards).values(cardRows);

  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, projectId),
    with:  { cards: { orderBy: (c, { asc }) => [asc(c.position)] } },
  });

  return Response.json(project, { status: 201 });
}
