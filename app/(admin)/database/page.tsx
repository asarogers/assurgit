import { cookies }            from "next/headers";
import { redirect }           from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb }              from "@/lib/db";
import { projects, cards }    from "@/lib/db/schema";
import { asc, desc }          from "drizzle-orm";
import { DatabaseClient }     from "@/components/database/DatabaseClient";

export const metadata = { title: "Database" };

export default async function DatabasePage() {
  const cookieStore = await cookies();
  const session     = cookieStore.get("owner_session")?.value;
  if (!session || !(await verifyOwnerSession(session))) redirect("/login");

  const db = getDb();

  const [allProjects, allCards] = await Promise.all([
    db.select().from(projects).orderBy(desc(projects.createdAt)),
    db.select().from(cards).orderBy(asc(cards.position)),
  ]);

  // Assemble cards per project
  const cardsMap = new Map<string, typeof allCards>();
  for (const card of allCards) {
    const list = cardsMap.get(card.projectId) ?? [];
    list.push(card);
    cardsMap.set(card.projectId, list);
  }

  const projectsWithCards = allProjects.map(p => ({
    ...p,
    cards: cardsMap.get(p.id) ?? [],
  }));

  return <DatabaseClient projects={projectsWithCards} />;
}
