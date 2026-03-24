import { getDb } from "@/lib/db";
import { cards, reviewSessions } from "@/lib/db/schema";
import { validateReviewToken } from "@/lib/token";
import { eq, and, ne } from "drizzle-orm";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const db = getDb();
  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const session = await db.query.reviewSessions.findFirst({
    where: (s, { eq }) => eq(s.projectId, parsed.projectId),
  });

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

  return Response.json({ ok: true });
}
