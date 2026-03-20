import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { generateReviewToken } from "@/lib/token";
import { eq } from "drizzle-orm";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id }  = await params;
  const token   = generateReviewToken(id);
  const now     = Date.now();

  await db.update(projects)
    .set({ token, updatedAt: now })
    .where(eq(projects.id, id));

  const appUrl  = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const reviewUrl = `${appUrl}/review?token=${token}`;

  return Response.json({ token, reviewUrl });
}
