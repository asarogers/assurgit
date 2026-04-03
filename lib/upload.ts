import { getCloudflareContext } from "@opennextjs/cloudflare";
import { nanoid } from "nanoid";

export async function saveUploadedVideo(
  file: File,
  prefix: string
): Promise<string> {
  const { env } = getCloudflareContext() as any;
  const bucket  = env.MEDIA_BUCKET as R2Bucket;

  if (!bucket) throw new Error("Storage not configured");

  const ext      = file.type === "video/quicktime" ? "mov" : "mp4";
  const key      = `cards/${prefix}-${nanoid()}.${ext}`;
  const arrayBuf = await file.arrayBuffer();

  await bucket.put(key, arrayBuf, {
    httpMetadata: { contentType: file.type },
  });

  const bucketUrl = (env.MEDIA_BUCKET_URL as string) ?? "";
  return `${bucketUrl}/${key}`;
}
