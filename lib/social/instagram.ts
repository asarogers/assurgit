const IG_BASE  = "https://api.instagram.com";
const GIG_BASE = "https://graph.instagram.com";

export async function exchangeCodeForToken(
  code: string,
  appId: string,
  appSecret: string,
  redirectUri: string
): Promise<{ accessToken: string; expiresIn: number }> {
  // Step 1: short-lived token via Instagram endpoint
  const short = await fetch(`${IG_BASE}/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: appId, client_secret: appSecret, redirect_uri: redirectUri, grant_type: "authorization_code", code }),
  }).then((r) => r.json()) as any;

  if (short.error_type || short.error) throw new Error(short.error_message ?? short.error?.message ?? "Token exchange failed");

  // Step 2: long-lived token (~60 days)
  const long = await fetch(
    `${GIG_BASE}/access_token?grant_type=ig_exchange_token&client_id=${appId}&client_secret=${appSecret}&access_token=${short.access_token}`
  ).then((r) => r.json()) as any;

  if (long.error) throw new Error(long.error.message ?? "Long-lived token exchange failed");

  return { accessToken: long.access_token, expiresIn: long.expires_in ?? 5184000 };
}

export async function getInstagramAccount(
  accessToken: string
): Promise<{ accountId: string; accountName: string; accountAvatar?: string }> {
  const me = await fetch(
    `${GIG_BASE}/me?fields=user_id,username,profile_picture_url&access_token=${accessToken}`
  ).then((r) => r.json()) as any;

  if (me.error) throw new Error(me.error.message);

  return {
    accountId:     me.user_id ?? me.id,
    accountName:   me.username,
    accountAvatar: me.profile_picture_url,
  };
}

export async function refreshInstagramToken(
  currentToken: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const res = await fetch(
    `${GIG_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
  ).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error.message);
  return { accessToken: res.access_token, expiresIn: res.expires_in ?? 5184000 };
}

export async function publishInstagramPost(
  igUserId: string,
  accessToken: string,
  caption: string,
  mediaUrl: string,
  mediaType: "IMAGE" | "VIDEO" | "REEL"
): Promise<{ containerId: string; mediaId: string }> {
  const containerParams: Record<string, string> = {
    caption,
    access_token: accessToken,
  };

  if (mediaType === "IMAGE") {
    containerParams.image_url  = mediaUrl;
  } else {
    containerParams.video_url  = mediaUrl;
    containerParams.media_type = mediaType;
  }

  const container = await fetch(`${GIG_BASE}/${igUserId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(containerParams),
  }).then((r) => r.json()) as any;

  if (container.error) throw new Error(container.error.message);

  if (mediaType !== "IMAGE") {
    await new Promise((r) => setTimeout(r, 10000));
  }

  const publish = await fetch(`${GIG_BASE}/${igUserId}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ creation_id: container.id, access_token: accessToken }),
  }).then((r) => r.json()) as any;

  if (publish.error) throw new Error(publish.error.message);

  return { containerId: container.id, mediaId: publish.id };
}
