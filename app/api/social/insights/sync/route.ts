import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { syncMetrics } from "@/lib/social/sync-metrics";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { env } = getCloudflareContext() as any;
  const { synced } = await syncMetrics({ env });

  return Response.json({ ok: true, synced });
}
