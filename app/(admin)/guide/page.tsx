import { cookies }  from "next/headers";
import { redirect }  from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { GuideClient } from "./GuideClient";

export default async function GuidePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("owner_session")?.value;
  if (!session || !(await verifyOwnerSession(session))) redirect("/login");

  const db = getDb();
  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
  });

  const projectList = allProjects.map((p) => ({
    id: p.id,
    name: p.name,
    token: p.token,
  }));

  return <GuideClient projects={projectList} />;
}
