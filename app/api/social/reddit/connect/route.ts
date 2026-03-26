import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { signOAuthState } from "@/lib/social/oauth-state";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const state = await signOAuthState(projectId);

  const { env } = getCloudflareContext() as any;
  const clientId    = env.REDDIT_CLIENT_ID as string ?? "";
  const appUrl      = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  const redirectUri = `${appUrl}/api/social/reddit/callback`;

  const params = new URLSearchParams({
    client_id:     clientId,
    response_type: "code",
    state,
    redirect_uri:  redirectUri,
    duration:      "permanent",
    scope:         "submit identity",
  });

  return Response.json({ url: `https://www.reddit.com/api/v1/authorize?${params}` });
}
