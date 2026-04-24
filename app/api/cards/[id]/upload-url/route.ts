import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getPresignedPutUrl, BUCKET_URL } from "@/lib/r2-presign";
import { nanoid } from "nanoid";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id }                   = await params;
  const { isFinal, ext = "mp4" } = await req.json() as { isFinal?: boolean; ext?: string };

  let env: any;
  try {
    env = (getCloudflareContext() as any).env;
  } catch {
    return Response.json({ error: "Runtime context unavailable" }, { status: 500 });
  }
  if (!env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY) {
    return Response.json({ error: "Storage credentials not configured" }, { status: 500 });
  }

  const suffix  = isFinal ? "-final" : "";
  const key     = `cards/card-${id}${suffix}-${nanoid()}.${ext}`;
  const fileUrl = `${BUCKET_URL}/${key}`;

  try {
    const uploadUrl = await getPresignedPutUrl(key, env);
    return Response.json({ uploadUrl, fileUrl });
  } catch (err) {
    console.error("[upload-url]", err);
    return Response.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
