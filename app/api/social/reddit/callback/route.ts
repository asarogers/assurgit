import { getDb } from "@/lib/db";
import { socialAccounts } from "@/lib/db/social-schema";
import { verifyOAuthState } from "@/lib/social/oauth-state";
import { exchangeCodeForToken, getRedditUser } from "@/lib/social/reddit";
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
  const clientId     = env.REDDIT_CLIENT_ID     as string ?? "";
  const clientSecret = env.REDDIT_CLIENT_SECRET as string ?? "";
  const redirectUri  = `${appUrl}/api/social/reddit/callback`;

  if (error || !code || !state) {
    return Response.redirect(`${appUrl}/social?error=oauth_denied`);
  }

  const parsed = await verifyOAuthState(state);
  if (!parsed) return Response.redirect(`${appUrl}/social?error=invalid_state`);

  try {
    const { accessToken, refreshToken, expiresIn } = await exchangeCodeForToken(code, clientId, clientSecret, redirectUri);
    const { userId, username, avatarUrl } = await getRedditUser(accessToken);

    const db  = getDb();
    const now = Date.now();

    await db.delete(socialAccounts).where(
      and(eq(socialAccounts.projectId, parsed.projectId), eq(socialAccounts.platform, "reddit"))
    );

    await db.insert(socialAccounts).values({
      id:             nanoid(),
      projectId:      parsed.projectId,
      platform:       "reddit",
      accountId:      userId,
      accountName:    username,
      accountAvatar:  avatarUrl ?? null,
      accessToken,
      refreshToken,
      tokenExpiresAt: now + expiresIn * 1000,
      createdAt:      now,
      updatedAt:      now,
    });

    return Response.redirect(`${appUrl}/social?connected=1`);
  } catch (err: any) {
    console.error("Reddit OAuth error:", err);
    return Response.redirect(`${appUrl}/social?error=${encodeURIComponent(err.message ?? "unknown")}`);
  }
}
