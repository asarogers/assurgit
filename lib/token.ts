import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export function generateReviewToken(_projectId: string): string {
  return randomBytes(32).toString("base64url");
}

export async function validateReviewToken(token: string): Promise<{ projectId: string } | null> {
  const db = getDb();
  const [project] = await db.select({ id: projects.id }).from(projects).where(eq(projects.token, token)).limit(1);
  return project ? { projectId: project.id } : null;
}
