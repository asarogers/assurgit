import { cookies }  from "next/headers";
import { redirect }  from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb }     from "@/lib/db";
import { projects }  from "@/lib/db/schema";
import { desc }      from "drizzle-orm";
import { ScheduleClient } from "@/components/schedule/ScheduleClient";

export default async function SchedulePage() {
  const cookieStore = await cookies();
  const session     = cookieStore.get("owner_session")?.value;
  if (!session || !(await verifyOwnerSession(session))) redirect("/login");

  const db = getDb();
  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
  });

  return <ScheduleClient initialProjects={allProjects} />;
}
