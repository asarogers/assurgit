import { getDb } from "@/lib/db";
import { socialAccounts } from "@/lib/db/social-schema";
import { verifyOAuthState } from "@/lib/social/oauth-state";
import { exchangeCodeForToken, getInstagramAccount } from "@/lib/social/instagram";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code  = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const { env } = getCloudflareContext() as any;
  const appUrl      = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  const appId       = env.INSTAGRAM_APP_ID     as string ?? "";
  const appSecret   = env.INSTAGRAM_APP_SECRET as string ?? "";
  const redirectUri = `${appUrl}/api/social/instagram/callback`;

  if (error || !code || !state) {
    return Response.redirect(`${appUrl}/social?error=oauth_denied`);
  }

  const parsed = await verifyOAuthState(state);
  if (!parsed) return Response.redirect(`${appUrl}/social?error=invalid_state`);

  try {
    const { accessToken, expiresIn } = await exchangeCodeForToken(code, appId, appSecret, redirectUri);
    const { accountId, accountName, accountAvatar } = await getInstagramAccount(accessToken);

    const db  = getDb();
    const now = Date.now();

    // Upsert: remove existing IG account for this project, then insert fresh
    await db.delete(socialAccounts).where(
      and(eq(socialAccounts.projectId, parsed.projectId), eq(socialAccounts.platform, "instagram"))
    );

    await db.insert(socialAccounts).values({
      id:             nanoid(),
      projectId:      parsed.projectId,
      platform:       "instagram",
      accountId,
      accountName,
      accountAvatar:  accountAvatar ?? null,
      accessToken,
      tokenExpiresAt: now + expiresIn * 1000,
      createdAt:      now,
      updatedAt:      now,
    });

    const dest = parsed.connectToken
      ? `${appUrl}/connect?token=${encodeURIComponent(parsed.connectToken)}&connected=1`
      : `${appUrl}/social?connected=1`;
    return Response.redirect(dest);
  } catch (err: any) {
    console.error("Instagram OAuth error:", err);
    const dest = parsed?.connectToken
      ? `${appUrl}/connect?token=${encodeURIComponent(parsed.connectToken)}&error=${encodeURIComponent(err.message ?? "unknown")}`
      : `${appUrl}/social?error=${encodeURIComponent(err.message ?? "unknown")}`;
    return Response.redirect(dest);
  }
}
