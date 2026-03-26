import { getDb } from "@/lib/db";
import { onboardingFiles } from "@/lib/db/schema";
import { validateReviewToken } from "@/lib/token";
import { eq, and } from "drizzle-orm";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const { id } = await params;
  const db = getDb();

  await db.delete(onboardingFiles).where(
    and(eq(onboardingFiles.id, id), eq(onboardingFiles.projectId, parsed.projectId))
  );

  return Response.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const { id }      = await params;
  const { category } = await req.json() as { category: string };
  const db = getDb();

  await db.update(onboardingFiles)
    .set({ category })
    .where(and(eq(onboardingFiles.id, id), eq(onboardingFiles.projectId, parsed.projectId)));

  return Response.json({ ok: true });
}
