import { getPgDb } from "@/lib/db/pg";
import { cards, projects, reviewSessions } from "@/lib/db/pg-schema";
import { validateReviewToken } from "@/lib/token";
import { sendApprovalNotification } from "@/lib/email";
import { eq, and, ne } from "drizzle-orm";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const db = getPgDb();
  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const session = (await db.select().from(reviewSessions).where(eq(reviewSessions.projectId, parsed.projectId)).limit(1))[0];

  if (!session) return Response.json({ error: "Session not found" }, { status: 404 });
  if (Date.now() > session.expiresAt) return Response.json({ error: "Link expired" }, { status: 410 });

  // Approve all non-denied cards
  await db.update(cards)
    .set({ status: "approved", updatedAt: Date.now() })
    .where(
      and(
        eq(cards.projectId, parsed.projectId),
        ne(cards.status, "denied")
      )
    );

  // Mark session complete
  await db.update(reviewSessions)
    .set({ completedAt: Date.now() })
    .where(eq(reviewSessions.id, session.id));

  const project = (await db.select().from(projects).where(eq(projects.id, parsed.projectId)).limit(1))[0];

  sendApprovalNotification({
    projectName: project?.name ?? parsed.projectId,
    clientEmail: session.email,
  }).catch(() => {});

  return Response.json({ ok: true });
}
