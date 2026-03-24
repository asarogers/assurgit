import { cookies } from "next/headers";
import { redirect }  from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { TerminalClient } from "@/components/terminal/TerminalClient";

export default async function TerminalPage() {
  const cookieStore = await cookies();
  const session     = cookieStore.get("owner_session")?.value;

  if (!session || !(await verifyOwnerSession(session))) {
    redirect("/login");
  }

  const db = getDb();
  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
    with:    { cards: { orderBy: (c, { asc }) => [asc(c.position)] } },
  });

  return <TerminalClient initialProjects={allProjects as any} />;
}
