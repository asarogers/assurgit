import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { signOAuthState } from "@/lib/social/oauth-state";
import { verifyConnectToken } from "@/lib/social/connect-token";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const SUPPORTED_PLATFORMS = ["reddit", "tiktok"] as const;
type ZernioPlatform = typeof SUPPORTED_PLATFORMS[number];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId    = searchParams.get("projectId");
  const platform     = searchParams.get("platform") as ZernioPlatform | null;
  const connectToken = searchParams.get("connectToken");

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });
  if (!platform || !SUPPORTED_PLATFORMS.includes(platform)) {
    return Response.json({ error: `platform must be one of: ${SUPPORTED_PLATFORMS.join(", ")}` }, { status: 400 });
  }

  if (connectToken) {
    const ct = await verifyConnectToken(connectToken);
    if (!ct || ct.projectId !== projectId) return Response.json({ error: "Invalid connect token" }, { status: 401 });
  } else {
    try { await requireOwner(req); } catch { return unauthorizedResponse(); }
  }

  const { env } = getCloudflareContext() as any;
  const apiKey    = env.ZERNIO_API_KEY    as string ?? "";
  const profileId = env.ZERNIO_PROFILE_ID as string ?? "";
  const appUrl    = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";

  const state       = await signOAuthState(projectId, connectToken ?? undefined);
  const redirectUrl = `${appUrl}/api/social/zernio/callback?state=${encodeURIComponent(state)}`;

  const res = await fetch(
    `https://zernio.com/api/v1/connect/${platform}?profileId=${profileId}&redirect_url=${encodeURIComponent(redirectUrl)}`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!res.ok) {
    const err = await res.json() as any;
    return Response.json({ error: err.message ?? "Zernio connect failed" }, { status: res.status });
  }

  const { authUrl } = await res.json() as any;
  return Response.json({ url: authUrl });
}
