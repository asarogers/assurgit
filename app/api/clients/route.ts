import { getPgDb } from "@/lib/db/pg";
import { clients, projects, cards, reviewSessions } from "@/lib/db/pg-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { nanoid } from "nanoid";
import { asc, desc, eq, inArray } from "drizzle-orm";

export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const db = getPgDb();

  const allClients = await db.select().from(clients).orderBy(desc(clients.createdAt));

  const clientIds = allClients.map((c) => c.id);
  const allProjects = clientIds.length > 0
    ? await db.select().from(projects).where(inArray(projects.clientId, clientIds)).orderBy(desc(projects.createdAt))
    : [];

  const projectIds = allProjects.map((p) => p.id);
  const allCards = projectIds.length > 0
    ? await db.select().from(cards).where(inArray(cards.projectId, projectIds)).orderBy(asc(cards.position))
    : [];
  const allReviewSessions = projectIds.length > 0
    ? await db.select().from(reviewSessions).where(inArray(reviewSessions.projectId, projectIds))
    : [];

  const cardsByProject: Record<string, typeof allCards> = {};
  for (const card of allCards) {
    if (!cardsByProject[card.projectId]) cardsByProject[card.projectId] = [];
    cardsByProject[card.projectId].push(card);
  }

  const sessionsByProject: Record<string, typeof allReviewSessions> = {};
  for (const session of allReviewSessions) {
    if (!sessionsByProject[session.projectId]) sessionsByProject[session.projectId] = [];
    sessionsByProject[session.projectId].push(session);
  }

  const projectsByClient: Record<string, typeof allProjects> = {};
  for (const project of allProjects) {
    const clientId = project.clientId ?? "";
    if (!projectsByClient[clientId]) projectsByClient[clientId] = [];
    projectsByClient[clientId].push({
      ...project,
      cards:          cardsByProject[project.id]          ?? [],
      reviewSessions: sessionsByProject[project.id]       ?? [],
    } as any);
  }

  const result = allClients.map((client) => ({
    ...client,
    projects: projectsByClient[client.id] ?? [],
  }));

  return Response.json(result);
}

export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { name } = await req.json() as { name: string };
  const db  = getPgDb();
  const now = Date.now();
  const id  = nanoid();

  await db.insert(clients).values({ id, name: name ?? "Untitled Project", createdAt: now, updatedAt: now });

  const client = (await db.select().from(clients).where(eq(clients.id, id)).limit(1))[0];

  const clientProjects = await db.select().from(projects).where(eq(projects.clientId, id));
  return Response.json({ ...client, projects: clientProjects }, { status: 201 });
}
