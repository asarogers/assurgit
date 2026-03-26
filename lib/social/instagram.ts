const IG_BASE  = "https://api.instagram.com";
const GIG_BASE = "https://graph.instagram.com";

export async function exchangeCodeForToken(
  code: string,
  appId: string,
  appSecret: string,
  redirectUri: string
): Promise<{ accessToken: string; expiresIn: number }> {
  // Step 1: short-lived Instagram user access token
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

export async function createInstagramContainer(
  igUserId: string,
  accessToken: string,
  caption: string,
  mediaUrl: string,
  mediaType: "IMAGE" | "VIDEO" | "REEL"
): Promise<string> {
  const containerParams: Record<string, string> = {
    caption,
    access_token: accessToken,
  };

  if (mediaType === "IMAGE") {
    containerParams.image_url  = mediaUrl;
  } else {
    containerParams.video_url  = mediaUrl;
    // Instagram API uses "REELS" for reels; regular VIDEO is deprecated — map to REELS
    containerParams.media_type = "REELS";
  }

  const containerRes = await fetch(`${GIG_BASE}/v21.0/${igUserId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(containerParams),
  });
  const container = await containerRes.json() as any;

  if (container.error) throw new Error(`Container error: ${container.error.message} (code ${container.error.code})`);
  if (!container.id) throw new Error(`Container creation failed: ${JSON.stringify(container)}`);

  return container.id;
}

// Returns mediaId if published, null if container not ready yet (call again next cron run)
export async function publishInstagramContainer(
  igUserId: string,
  accessToken: string,
  containerId: string
): Promise<string | null> {
  const statusRes = await fetch(
    `${GIG_BASE}/v21.0/${containerId}?fields=status_code,status&access_token=${accessToken}`
  );
  const status = await statusRes.json() as any;

  if (status.status_code === "ERROR") throw new Error(`Container processing failed: ${JSON.stringify(status)}`);
  if (status.status_code !== "FINISHED") return null; // not ready, try again next cron run

  const publishRes = await fetch(`${GIG_BASE}/v21.0/${igUserId}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ creation_id: containerId, access_token: accessToken }),
  });
  const publish = await publishRes.json() as any;

  if (publish.error) throw new Error(`Publish error: ${publish.error.message} (code ${publish.error.code})`);
  if (!publish.id) throw new Error(`Publish failed: ${JSON.stringify(publish)}`);

  return publish.id;
}

export async function getPostInsights(
  mediaId: string,
  accessToken: string
): Promise<{ impressions: number; reach: number; likes: number; comments: number; shares: number; saved: number } | null> {
  const res = await fetch(
    `https://graph.instagram.com/v21.0/${mediaId}/insights?metric=impressions,reach,likes,comments,shares,saved&access_token=${accessToken}`
  );
  if (!res.ok) return null;
  const json = await res.json() as any;
  const data: Record<string, number> = {};
  for (const item of json.data ?? []) data[item.name] = item.values?.[0]?.value ?? item.value ?? 0;
  return { impressions: data.impressions ?? 0, reach: data.reach ?? 0, likes: data.likes ?? 0, comments: data.comments ?? 0, shares: data.shares ?? 0, saved: data.saved ?? 0 };
}
