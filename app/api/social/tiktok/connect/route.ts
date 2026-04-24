import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { signOAuthState } from "@/lib/social/oauth-state";
import { verifyConnectToken } from "@/lib/social/connect-token";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { getPgDb } from "@/lib/db/pg";
import { projects } from "@/lib/db/pg-schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId    = searchParams.get("projectId");
  const connectToken = searchParams.get("connectToken");

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  if (connectToken) {
    const ct = await verifyConnectToken(connectToken);
    if (!ct || ct.projectId !== projectId) return Response.json({ error: "Invalid connect token" }, { status: 401 });
  } else {
    try { await requireOwner(req); } catch { return unauthorizedResponse(); }
  }

  const db = getPgDb();
  const [project] = await db.select({ clientId: projects.clientId }).from(projects).where(eq(projects.id, projectId)).limit(1);
  const state = await signOAuthState(projectId, connectToken ?? undefined, project?.clientId ?? undefined);

  const { env } = getCloudflareContext() as any;
  const clientKey   = env.TIKTOK_CLIENT_KEY as string ?? "";
  const appUrl      = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  const redirectUri = `${appUrl}/api/social/tiktok/callback`;

  const params = new URLSearchParams({
    client_key:    clientKey,
    redirect_uri:  redirectUri,
    response_type: "code",
    scope:         "user.info.basic,video.publish",
    state,
  });

  return Response.json({ url: `https://www.tiktok.com/v2/auth/authorize/?${params}` });
}
