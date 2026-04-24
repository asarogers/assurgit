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
  const clientId  = env.GOOGLE_CLIENT_ID as string ?? "";
  const appUrl    = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  const redirectUri = `${appUrl}/api/social/youtube/callback`;

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  redirectUri,
    response_type: "code",
    scope:         "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly",
    access_type:   "offline",
    prompt:        "consent",
    state,
  });

  return Response.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
}
