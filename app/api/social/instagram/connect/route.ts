import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { signOAuthState } from "@/lib/social/oauth-state";
import { verifyConnectToken } from "@/lib/social/connect-token";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId    = searchParams.get("projectId");
  const connectToken = searchParams.get("connectToken");

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  // Accept either admin session OR a valid client connect token for this project
  if (connectToken) {
    const ct = await verifyConnectToken(connectToken);
    if (!ct || ct.projectId !== projectId) return Response.json({ error: "Invalid connect token" }, { status: 401 });
  } else {
    try { await requireOwner(req); } catch { return unauthorizedResponse(); }
  }

  const state = await signOAuthState(projectId, connectToken ?? undefined);

  const { env } = getCloudflareContext() as any;
  const appId       = env.INSTAGRAM_APP_ID as string ?? "";
  const appUrl      = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  const redirectUri = `${appUrl}/api/social/instagram/callback`;

  const params = new URLSearchParams({
    client_id:     appId,
    redirect_uri:  redirectUri,
    scope:         "instagram_business_basic,instagram_business_content_publish,instagram_business_manage_comments,instagram_business_manage_insights",
    response_type: "code",
    force_reauth:  "true",
    state,
  });

  return Response.json({ url: `https://www.instagram.com/oauth/authorize?${params}` });
}
