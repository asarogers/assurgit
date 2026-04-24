const TIKTOK_TOKEN_URL   = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_PUBLISH_URL = "https://open.tiktokapis.com/v2/post/publish/video/init/";
const TIKTOK_STATUS_URL  = "https://open.tiktokapis.com/v2/post/publish/status/fetch/";
const TIKTOK_USER_URL    = "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url";

export async function exchangeCodeForToken(
  code: string,
  clientKey: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; expiresIn: number; openId: string }> {
  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_key:    clientKey,
      client_secret: clientSecret,
      redirect_uri:  redirectUri,
      grant_type:    "authorization_code",
    }),
  }).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error_description ?? res.error);
  return {
    accessToken:  res.access_token,
    refreshToken: res.refresh_token,
    expiresIn:    res.expires_in ?? 86400,
    openId:       res.open_id,
  };
}

export async function refreshAccessToken(
  refreshToken: string,
  clientKey: string,
  clientSecret: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_key:    clientKey,
      client_secret: clientSecret,
      grant_type:    "refresh_token",
    }),
  }).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error_description ?? res.error);
  return { accessToken: res.access_token, expiresIn: res.expires_in ?? 86400 };
}

export async function getTikTokUser(
  accessToken: string
): Promise<{ openId: string; displayName: string; avatarUrl?: string }> {
  const res = await fetch(TIKTOK_USER_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((r) => r.json()) as any;

  if (res.error?.code && res.error.code !== "ok") throw new Error(res.error.message);
  const user = res.data?.user;
  if (!user) throw new Error("No TikTok user returned");
  return { openId: user.open_id, displayName: user.display_name, avatarUrl: user.avatar_url };
}

export async function publishTikTokVideo(opts: {
  accessToken:    string;
  refreshToken:   string;
  clientKey:      string;
  clientSecret:   string;
  tokenExpiresAt: number;
  videoUrl:       string;   // publicly accessible MP4 URL (e.g. from R2)
  caption:        string;
  privacyLevel?:  "PUBLIC_TO_EVERYONE" | "FOLLOWER_OF_CREATOR" | "MUTUAL_FOLLOW_FRIENDS" | "SELF_ONLY";
}): Promise<string> {
  let accessToken = opts.accessToken;
  if (Date.now() > opts.tokenExpiresAt - 2 * 60 * 1000) {
    const refreshed = await refreshAccessToken(opts.refreshToken, opts.clientKey, opts.clientSecret);
    accessToken = refreshed.accessToken;
  }

  const res = await fetch(TIKTOK_PUBLISH_URL, {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      post_info: {
        title:                   opts.caption,
        privacy_level:           opts.privacyLevel ?? "PUBLIC_TO_EVERYONE",
        disable_duet:            false,
        disable_comment:         false,
        disable_stitch:          false,
        video_cover_timestamp_ms: 1000,
      },
      source_info: {
        source:    "PULL_FROM_URL",
        video_url: opts.videoUrl,
      },
    }),
  }).then((r) => r.json()) as any;

  if (res.error?.code && res.error.code !== "ok") {
    throw new Error(res.error.message ?? JSON.stringify(res.error));
  }
  const publishId = res.data?.publish_id;
  if (!publishId) throw new Error("TikTok did not return a publish_id");
  return publishId;
}

export async function getPublishStatus(
  publishId: string,
  accessToken: string
): Promise<{ status: string; failReason?: string }> {
  const res = await fetch(TIKTOK_STATUS_URL, {
    method:  "POST",
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ publish_id: publishId }),
  }).then((r) => r.json()) as any;

  if (res.error?.code && res.error.code !== "ok") {
    throw new Error(res.error.message ?? JSON.stringify(res.error));
  }
  return {
    status:     res.data?.status ?? "UNKNOWN",
    failReason: res.data?.fail_reason,
  };
}
