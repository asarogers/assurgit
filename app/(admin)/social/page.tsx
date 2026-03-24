import { cookies }  from "next/headers";
import { redirect }  from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb }     from "@/lib/db";
import { projects }  from "@/lib/db/schema";
import { scheduledPosts } from "@/lib/db/social-schema";
import { desc, eq }  from "drizzle-orm";
import { SocialClient } from "@/components/social/SocialClient";

export default async function SocialPage() {
  const cookieStore = await cookies();
  const session     = cookieStore.get("owner_session")?.value;
  if (!session || !(await verifyOwnerSession(session))) redirect("/login");

  const db = getDb();

  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
    with: { socialAccounts: true },
  });

  // Load all scheduled posts in one query and group by projectId
  const allPosts = await db.query.scheduledPosts.findMany({
    orderBy: [desc(scheduledPosts.createdAt)],
  });

  const postsByProject: Record<string, typeof allPosts> = {};
  for (const post of allPosts) {
    if (!postsByProject[post.projectId]) postsByProject[post.projectId] = [];
    postsByProject[post.projectId].push(post);
  }

  return (
    <SocialClient
      initialProjects={allProjects as any}
      initialPosts={postsByProject}
    />
  );
}
