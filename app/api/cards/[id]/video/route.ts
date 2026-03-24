import { getDb } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { saveUploadedVideo } from "@/lib/upload";
import { eq } from "drizzle-orm";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id }   = await params;
  const db       = getDb();
  const formData = await req.formData();
  const file     = formData.get("video") as File | null;
  const isFinal  = formData.get("final") === "true";

  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

  const videoPath = await saveUploadedVideo(file, `card-${id}${isFinal ? "-final" : ""}`);
  const field     = isFinal ? { finalVideoPath: videoPath } : { videoPath };

  await db.update(cards)
    .set({ ...field, updatedAt: Date.now() })
    .where(eq(cards.id, id));

  return Response.json({ path: videoPath });
}
