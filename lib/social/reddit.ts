const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const REDDIT_API_BASE  = "https://oauth.reddit.com";

export async function exchangeCodeForToken(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const res = await fetch(REDDIT_TOKEN_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type":  "application/x-www-form-urlencoded",
      "User-Agent":    "Assurgit/1.0",
    },
    body: new URLSearchParams({
      grant_type:   "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  }).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error);
  if (!res.refresh_token) throw new Error("No refresh token — ensure duration=permanent");

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
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const res = await fetch(REDDIT_TOKEN_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type":  "application/x-www-form-urlencoded",
      "User-Agent":    "Assurgit/1.0",
    },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: refreshToken,
    }),
  }).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.error);
  return { accessToken: res.access_token, expiresIn: res.expires_in ?? 3600 };
}

export async function getRedditUser(
  accessToken: string
): Promise<{ userId: string; username: string; avatarUrl?: string }> {
  const res = await fetch(`${REDDIT_API_BASE}/api/v1/me`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "User-Agent":    "Assurgit/1.0",
    },
  }).then((r) => r.json()) as any;

  if (res.error) throw new Error(res.message ?? res.error);

  return {
    userId:    String(res.id),
    username:  res.name,
    avatarUrl: res.icon_img?.split("?")[0],
  };
}
