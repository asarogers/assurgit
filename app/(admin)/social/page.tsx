import { cookies }            from "next/headers";
import { redirect }           from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb }              from "@/lib/db";
import { clients, projects }  from "@/lib/db/schema";
import { scheduledPosts } from "@/lib/db/pg-schema";
import { socialAccounts } from "@/lib/db/social-schema";
import { desc, inArray }      from "drizzle-orm";
import { SocialClient }       from "@/components/social/SocialClient";
import { ADMIN_EMAIL }        from "@/lib/email";

export default async function SocialPage() {
  const cookieStore = await cookies();
  const session     = cookieStore.get("owner_session")?.value;
  if (!session || !(await verifyOwnerSession(session))) redirect("/login");

  const db = getDb();

  const [allClients, allProjects, allAccounts, allPosts] = await Promise.all([
    db.select().from(clients).orderBy(desc(clients.createdAt)),
    db.select().from(projects).orderBy(desc(projects.createdAt)),
    db.select().from(socialAccounts),
    db.select().from(scheduledPosts).orderBy(desc(scheduledPosts.createdAt)),
  ]);

  // Group accounts: by clientId if available, else by projectId
  const accountsByClient:  Record<string, typeof allAccounts> = {};
  const accountsByProject: Record<string, typeof allAccounts> = {};
  for (const a of allAccounts) {
    if (a.clientId) {
      (accountsByClient[a.clientId] ??= []).push(a);
    } else {
      (accountsByProject[a.projectId] ??= []).push(a);
    }
  }

  const postsByProject: Record<string, typeof allPosts> = {};
  for (const p of allPosts) {
    (postsByProject[p.projectId] ??= []).push(p);
  }

  // Attach accounts to projects — client-scoped when available, else project-scoped
  const projectsWithAccounts = allProjects.map(p => ({
    ...p,
    socialAccounts: (p.clientId ? accountsByClient[p.clientId] : accountsByProject[p.id]) ?? [],
  }));

  // Group projects by clientId
  const projectsByClient: Record<string, typeof projectsWithAccounts> = {};
  for (const p of projectsWithAccounts) {
    const key = p.clientId ?? "__orphan__";
    (projectsByClient[key] ??= []).push(p);
  }

  // Assemble clients with their projects
  const clientsWithProjects = allClients.map(c => ({
    ...c,
    projects: projectsByClient[c.id] ?? [],
  }));

  const orphans = projectsWithAccounts.filter(p => !p.clientId);

  return (
    <SocialClient
      initialClients={clientsWithProjects as any}
      initialOrphans={orphans as any}
      initialPosts={postsByProject}
      adminEmail={ADMIN_EMAIL}
    />
  );
}
