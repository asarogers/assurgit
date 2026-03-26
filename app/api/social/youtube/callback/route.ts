import { getDb } from "@/lib/db";
import { socialAccounts } from "@/lib/db/social-schema";
import { verifyOAuthState } from "@/lib/social/oauth-state";
import { exchangeCodeForToken, getYouTubeChannel } from "@/lib/social/youtube";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code  = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const { env } = getCloudflareContext() as any;
  const appUrl       = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  const clientId     = env.GOOGLE_CLIENT_ID     as string ?? "";
  const clientSecret = env.GOOGLE_CLIENT_SECRET as string ?? "";
  const redirectUri  = `${appUrl}/api/social/youtube/callback`;

  if (error || !code || !state) {
    return Response.redirect(`${appUrl}/social?error=oauth_denied`);
  }

  const parsed = await verifyOAuthState(state);
  if (!parsed) return Response.redirect(`${appUrl}/social?error=invalid_state`);

  try {
    const { accessToken, refreshToken, expiresIn } = await exchangeCodeForToken(code, clientId, clientSecret, redirectUri);
    const { channelId, channelName, channelAvatar } = await getYouTubeChannel(accessToken);

    const db  = getDb();
    const now = Date.now();

    await db.delete(socialAccounts).where(
      and(eq(socialAccounts.projectId, parsed.projectId), eq(socialAccounts.platform, "youtube"))
    );

    await db.insert(socialAccounts).values({
      id:             nanoid(),
      projectId:      parsed.projectId,
      platform:       "youtube",
      accountId:      channelId,
      accountName:    channelName,
      accountAvatar:  channelAvatar ?? null,
      accessToken,
      refreshToken,
      tokenExpiresAt: now + expiresIn * 1000,
      createdAt:      now,
      updatedAt:      now,
    });

    const dest = parsed.connectToken
      ? `${appUrl}/connect?token=${encodeURIComponent(parsed.connectToken)}&connected=1`
      : `${appUrl}/social?connected=1`;
    return Response.redirect(dest);
  } catch (err: any) {
    console.error("YouTube OAuth error:", err);
    const dest = parsed?.connectToken
      ? `${appUrl}/connect?token=${encodeURIComponent(parsed.connectToken)}&error=${encodeURIComponent(err.message ?? "unknown")}`
      : `${appUrl}/social?error=${encodeURIComponent(err.message ?? "unknown")}`;
    return Response.redirect(dest);
  }
}
