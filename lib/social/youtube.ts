const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export async function exchangeCodeForToken(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id:     clientId,
      client_secret: clientSecret,
      redirect_uri:  redirectUri,
      grant_type:    "authorization_code",
    }),
  }).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error_description ?? res.error);
  if (!res.refresh_token) throw new Error("No refresh token returned — ensure access_type=offline and prompt=consent");

  return {
    accessToken:  res.access_token,
    refreshToken: res.refresh_token,
    expiresIn:    res.expires_in ?? 3600,
  };
}

export async function refreshAccessToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id:     clientId,
      client_secret: clientSecret,
      grant_type:    "refresh_token",
    }),
  }).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error_description ?? res.error);
  return { accessToken: res.access_token, expiresIn: res.expires_in ?? 3600 };
}

export async function publishYouTubeVideo(opts: {
  accessToken:    string;
  refreshToken:   string;
  clientId:       string;
  clientSecret:   string;
  tokenExpiresAt: number;
  mediaUrl:       string;
  title:          string;
  description:    string;
  visibility:     "public" | "unlisted" | "private";
}): Promise<string> {
  // Refresh Google token if it expires within the next 2 minutes
  let accessToken = opts.accessToken;
  if (Date.now() > opts.tokenExpiresAt - 2 * 60 * 1000) {
    const refreshed = await refreshAccessToken(opts.refreshToken, opts.clientId, opts.clientSecret);
    accessToken = refreshed.accessToken;
  }

  // Step 1: Initiate resumable upload and get upload URI
  const metadata = {
    snippet: { title: opts.title, description: opts.description, categoryId: "22" },
    status:  { privacyStatus: opts.visibility, selfDeclaredMadeForKids: false },
  };

  const initRes = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method:  "POST",
      headers: {
        Authorization:          `Bearer ${accessToken}`,
        "Content-Type":         "application/json",
        "X-Upload-Content-Type": "video/*",
      },
      body: JSON.stringify(metadata),
    }
  );

  if (!initRes.ok) {
    const err = await initRes.json() as any;
    throw new Error(err.error?.message ?? `YouTube upload init failed (${initRes.status})`);
  }

  const uploadUri = initRes.headers.get("Location");
  if (!uploadUri) throw new Error("YouTube did not return an upload URI");

  // Step 2: Fetch video from CDN and stream directly to YouTube (no buffering)
  const videoRes = await fetch(opts.mediaUrl);
  if (!videoRes.ok) throw new Error(`Failed to fetch video from media URL (${videoRes.status})`);

  const headers: Record<string, string> = { "Content-Type": videoRes.headers.get("content-type") ?? "video/mp4" };
  const contentLength = videoRes.headers.get("content-length");
  if (contentLength) headers["Content-Length"] = contentLength;

  const uploadRes = await fetch(uploadUri, {
    method: "PUT",
    headers,
    body:   videoRes.body,
    // @ts-ignore — Cloudflare Workers require duplex when streaming a body
    duplex: "half",
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.json() as any;
    throw new Error(err.error?.message ?? `YouTube upload failed (${uploadRes.status})`);
  }

  const video = await uploadRes.json() as any;
  return video.id as string;
}

export async function getVideoStats(
  videoId: string,
  accessToken: string
): Promise<{ views: number; likes: number; comments: number } | null> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) return null;
  const json = await res.json() as any;
  const stats = json.items?.[0]?.statistics;
  if (!stats) return null;
  return { views: Number(stats.viewCount ?? 0), likes: Number(stats.likeCount ?? 0), comments: Number(stats.commentCount ?? 0) };
}

export async function getYouTubeChannel(
  accessToken: string
): Promise<{ channelId: string; channelName: string; channelAvatar?: string }> {
  const res = await fetch(
    `${YOUTUBE_API_BASE}/channels?part=snippet&mine=true`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  ).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error.message);

  const channel = res.items?.[0];
  if (!channel) throw new Error("No YouTube channel found on this account");

  return {
    channelId:     channel.id,
    channelName:   channel.snippet.title,
    channelAvatar: channel.snippet.thumbnails?.default?.url,
  };
}
