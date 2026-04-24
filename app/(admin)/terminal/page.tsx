import { cookies }            from "next/headers";
import { redirect }           from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb }              from "@/lib/db";
import { clients, projects, cards, reviewSessions } from "@/lib/db/schema";
import { desc, inArray, isNull, asc } from "drizzle-orm";
import { TerminalClient }     from "@/components/terminal/TerminalClient";

export default async function TerminalPage() {
  const cookieStore = await cookies();
  const session     = cookieStore.get("owner_session")?.value;

  if (!session || !(await verifyOwnerSession(session))) {
    redirect("/login");
  }

  const db = getDb();

  // Fetch all data in separate queries to avoid json_group_array issues with D1 HTTP
  const [allClients, allProjects, allCards, allSessions] = await Promise.all([
    db.select().from(clients).orderBy(desc(clients.createdAt)),
    db.select().from(projects).orderBy(desc(projects.createdAt)),
    db.select().from(cards).orderBy(asc(cards.position)),
    db.select().from(reviewSessions),
  ]);

  // Assemble the nested structure in memory
  const cardsMap    = new Map<string, typeof allCards>();
  const sessionsMap = new Map<string, typeof allSessions[0]>();

  for (const card of allCards) {
    const list = cardsMap.get(card.projectId) ?? [];
    list.push(card);
    cardsMap.set(card.projectId, list);
  }
  for (const s of allSessions) {
    sessionsMap.set(s.projectId, s);
  }

  const projectsWithCards = allProjects.map(p => ({
    ...p,
    cards:          cardsMap.get(p.id) ?? [],
    reviewSessions: sessionsMap.has(p.id) ? [sessionsMap.get(p.id)!] : [],
  }));

  const projectsByClient = new Map<string | null, typeof projectsWithCards>();
  for (const p of projectsWithCards) {
    const key = p.clientId ?? null;
    const list = projectsByClient.get(key) ?? [];
    list.push(p);
    projectsByClient.set(key, list);
  }

  const allClientsWithProjects = allClients.map(c => ({
    ...c,
    projects: projectsByClient.get(c.id) ?? [],
  }));

  const orphans = projectsWithCards.filter(p => !p.clientId);

  return <TerminalClient initialClients={allClientsWithProjects as any} initialOrphans={orphans as any} />;
}
