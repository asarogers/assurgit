import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getPresignedPutUrl, BUCKET_URL } from "@/lib/r2-presign";
import { nanoid } from "nanoid";

const CONTENT_TYPES: Record<string, string> = {
  mp4: "video/mp4",
  mov: "video/quicktime",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  const { id }                   = await params;
  const { isFinal, ext = "mp4" } = await req.json() as { isFinal?: boolean; ext?: string };

  const { env } = getCloudflareContext() as any;
  if (!env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY) {
    return Response.json({ error: "Storage credentials not configured" }, { status: 500 });
  }

  const suffix      = isFinal ? "-final" : "";
  const key         = `cards/card-${id}${suffix}-${nanoid()}.${ext}`;
  const contentType = CONTENT_TYPES[ext.toLowerCase()] ?? "video/mp4";
  const fileUrl     = `${BUCKET_URL}/${key}`;

  const uploadUrl = await getPresignedPutUrl(key, contentType, env);

  return Response.json({ uploadUrl, fileUrl });
}
