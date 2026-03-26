import { getDb } from "@/lib/db";
import { projects, reviewSessions } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { sendReviewLink } from "@/lib/email";
import { REVIEW_EXPIRY_MS, MAX_DENIES } from "@/lib/constants";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id }   = await params;
  const db       = getDb();
  const { email } = await req.json() as { email: string };

  if (!email) return Response.json({ error: "Email required" }, { status: 400 });

  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, id),
  });
  if (!project) return Response.json({ error: "Not found" }, { status: 404 });

  const now      = Date.now();
  const expires  = now + REVIEW_EXPIRY_MS;

  // Cache the client email on the project for future use
  await db.update(projects).set({ clientEmail: email }).where(eq(projects.id, id));

  // Delete old session for this project (reset deny counter on resend)
  await db.delete(reviewSessions).where(eq(reviewSessions.projectId, id));

  await db.insert(reviewSessions).values({
    id:         nanoid(),
    projectId:  id,
    email,
    deniesLeft: MAX_DENIES,
    expiresAt:  expires,
    createdAt:  now,
  });

  const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const reviewUrl = `${appUrl}/review?token=${project.token}`;

  try {
    await sendReviewLink({ to: email, projectName: project.name, reviewUrl, expiresAt: expires });
  } catch (err) {
    console.error("Email send failed:", err);
    // Don't block on email failure — session is created, URL can be shared manually
  }

  return Response.json({ ok: true, reviewUrl });
}
