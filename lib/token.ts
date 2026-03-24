import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";

export function generateReviewToken(_projectId: string): string {
  return randomBytes(32).toString("base64url");
}

export async function validateReviewToken(token: string): Promise<{ projectId: string } | null> {
  const db = getDb();
  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.token, token),
  });
  return project ? { projectId: project.id } : null;
}
