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
  const appId       = env.INSTAGRAM_APP_ID as string ?? "";
  const appUrl      = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  const redirectUri = `${appUrl}/api/social/instagram/callback`;

  const params = new URLSearchParams({
    client_id:     appId,
    redirect_uri:  redirectUri,
    scope:         "instagram_business_basic,instagram_business_content_publish,pages_show_list,pages_read_engagement",
    response_type: "code",
    state,
  });

  return Response.json({ url: `https://api.instagram.com/oauth/authorize?${params}` });
}
