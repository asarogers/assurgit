# Social Media OAuth Setup Guide

This document covers every step needed to complete OAuth integration for Instagram, Facebook, Reddit, and TikTok in assurgit.

---

## Instagram (+ Facebook Pages)

Instagram posting requires a **Meta Developer App** with a Facebook Page connected to an Instagram Business Account. Both platforms share the same app and token.

### 1. Create a Meta Developer App

1. Go to https://developers.facebook.com/apps
2. Click **Create App** → choose **Business** type
3. Name it (e.g. "Assurgit Scheduler")
4. Under **Add Products**, add:
   - **Facebook Login**
   - **Instagram Graph API**

### 2. Configure Facebook Login

1. In the app dashboard → **Facebook Login → Settings**
2. Add Valid OAuth Redirect URIs:
   - Production: `https://assurgit.com/api/social/instagram/callback`
   - Local testing via ngrok: `https://<ngrok-subdomain>.ngrok.io/api/social/instagram/callback` (Facebook requires HTTPS — plain `http://localhost` is not accepted)
3. Save changes

> **Tip:** For local testing, run `ngrok http 3000` to get a temporary HTTPS URL and add it as an additional redirect URI. Remove it when done.

### 3. Request Permissions

In **App Review → Permissions and Features**, request:
- `instagram_basic`
- `instagram_content_publish`
- `pages_show_list`
- `pages_read_engagement`

> While in Development mode you can test with accounts added as Testers/Developers under **Roles**. To go live you must submit for App Review.

### 4. Get Your Credentials

From **App Settings → Basic**:
- Copy **App ID** → this is `INSTAGRAM_APP_ID`
- Copy **App Secret** → this is `INSTAGRAM_APP_SECRET`

### 5. Set Environment Variables

**.env.local** (for local dev):
```
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_REDIRECT_URI=https://assurgit.com/api/social/instagram/callback
```

**Cloudflare secrets** (for production):
```bash
npx wrangler secret put INSTAGRAM_APP_ID
npx wrangler secret put INSTAGRAM_APP_SECRET
```

**wrangler.toml** (add under `[vars]`):
```toml
INSTAGRAM_REDIRECT_URI = "https://assurgit.com/api/social/instagram/callback"
```

### 6. Client Requirements

For each client using Instagram through assurgit:
- They need an **Instagram Business** or **Creator** account (not personal)
- It must be connected to a **Facebook Page** they manage
- They authorize via the OAuth flow at `/social` → Connect Instagram

### 7. Token Refresh

Instagram long-lived tokens last ~60 days. Refresh them before expiry by calling `refreshInstagramToken()` from `lib/social/instagram.ts`. Consider scheduling a Cloudflare Cron to refresh tokens approaching expiry.

---

## Facebook (Pages)

Facebook page posting reuses the **same Meta app** as Instagram. The token obtained during Instagram OAuth already includes `pages_show_list` and `pages_read_engagement`, so you can post to their Facebook Page with no separate OAuth flow.

### 1. Add Required Permissions to the Meta App

In **App Review → Permissions and Features**, additionally request:
- `pages_manage_posts` — required to publish posts to a Page

### 2. Get the Page Access Token

After OAuth, use the user access token to get Page tokens:
```
GET https://graph.facebook.com/v19.0/me/accounts?access_token={user_token}
```
Each page in the response has its own `access_token`. Store this as a separate `social_accounts` row with `platform = 'facebook'`.

### 3. Post to a Facebook Page

```
POST https://graph.facebook.com/v19.0/{page_id}/feed
  message=your caption
  link=optional url
  access_token={page_access_token}
```

For photo posts use `/{page_id}/photos`, for video use `/{page_id}/videos`.

### 4. Implementation Steps

1. Update `app/api/social/instagram/callback/route.ts` to also extract + store Facebook Page accounts after token exchange
2. Add `lib/social/facebook.ts` with `publishFacebookPost()` helper
3. Add connect/disconnect/post API routes under `app/api/social/facebook/`
4. Extend `SocialClient` and `ProjectSocialRow` components to show Facebook alongside Instagram

---

## Reddit

Reddit uses standard **OAuth 2.0** with its own developer app.

### 1. Create a Reddit App

1. Go to https://www.reddit.com/prefs/apps
2. Click **Create another app**
3. Choose **web app**
4. Set redirect URI:
   - Production: `https://assurgit.com/api/social/reddit/callback`
   - Local: `http://localhost:3000/api/social/reddit/callback` (Reddit allows plain HTTP localhost)
5. Note your **Client ID** (under the app name) and **Client Secret**

### 2. Set Environment Variables

**.env.local**:
```
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_REDIRECT_URI=https://assurgit.com/api/social/reddit/callback
```

**Cloudflare secrets**:
```bash
npx wrangler secret put REDDIT_CLIENT_ID
npx wrangler secret put REDDIT_CLIENT_SECRET
```

**wrangler.toml** `[vars]`:
```toml
REDDIT_REDIRECT_URI = "https://assurgit.com/api/social/reddit/callback"
```

### 3. OAuth Scopes

Request these scopes in your authorization URL:
- `submit` — post links and text posts
- `identity` — get the authenticated user's username
- `read` — read posts/comments (optional)

### 4. OAuth Flow

Authorization URL:
```
https://www.reddit.com/api/v1/authorize
  ?client_id={client_id}
  &response_type=code
  &state={signed_jwt_state}
  &redirect_uri={redirect_uri}
  &duration=permanent
  &scope=submit identity
```

Token exchange (Basic Auth with client_id:client_secret):
```
POST https://www.reddit.com/api/v1/access_token
  grant_type=authorization_code
  &code={code}
  &redirect_uri={redirect_uri}
```

Reddit refresh tokens do not expire — store both `access_token` and `refresh_token`.

### 5. Post to a Subreddit

```
POST https://oauth.reddit.com/api/submit
  Authorization: Bearer {access_token}
  sr=subreddit_name
  kind=link|self
  title=post title
  url=link_url (for kind=link)
  text=post body (for kind=self)
  resubmit=true
```

### 6. Implementation Steps

1. Create `app/api/social/reddit/connect/route.ts` (same pattern as Instagram connect)
2. Create `app/api/social/reddit/callback/route.ts` (exchange code, store token)
3. Create `lib/social/reddit.ts` with `publishRedditPost()` helper
4. Add disconnect route
5. Extend social UI to show Reddit per project

---

## TikTok (via Late API)

TikTok's Content Posting API is locked behind **business review** and hard to get direct access to. The recommended path is using **Late** (lateapp.co) as a managed layer which handles TikTok's API access for you.

### 1. Sign Up for Late

1. Go to https://lateapp.co
2. Create an account (flat-rate pricing, multiple TikTok accounts supported)
3. Connect your client's TikTok accounts through Late's dashboard

### 2. Get Late API Credentials

In Late's developer/API settings:
- Copy your **API Key**

**.env.local**:
```
LATE_API_KEY=your_late_api_key
```

**Cloudflare secret**:
```bash
npx wrangler secret put LATE_API_KEY
```

### 3. Schedule a TikTok Post via Late API

Check Late's API docs for the exact endpoint, but the general pattern:
```
POST https://api.lateapp.co/v1/posts
  Authorization: Bearer {LATE_API_KEY}
  {
    "platform": "tiktok",
    "accountId": "tiktok_account_id",
    "caption": "post caption",
    "mediaUrl": "https://...",
    "scheduledAt": "2024-01-15T10:00:00Z"
  }
```

### 4. Implementation Steps

1. Create `lib/social/late.ts` with `scheduleTikTokPost()` helper
2. Create `app/api/social/tiktok/schedule/route.ts`
3. In the social UI, show TikTok as "via Late" with a link to connect accounts there
4. Add `platform = 'tiktok'` entries to `social_accounts` manually or via Late webhook

---

## Cloudflare Cron for Auto-Publishing

Scheduled posts stored in `scheduled_posts` need a cron job to publish them.

### 1. Add Cron Trigger to wrangler.toml

```toml
[triggers]
crons = ["*/5 * * * *"]  # every 5 minutes
```

### 2. Create the Cron Handler

Create `app/api/cron/publish/route.ts`:
```typescript
export async function GET(req: Request) {
  // Verify this is a Cloudflare cron call
  const db = getDb();
  const now = Date.now();

  const due = await db.query.scheduledPosts.findMany({
    where: (p, { eq, lte, and }) =>
      and(eq(p.status, 'scheduled'), lte(p.scheduledAt, now)),
    with: { socialAccount: true },
  });

  for (const post of due) {
    // publish based on post.socialAccount.platform
    // update status to 'published' or 'failed'
  }
}
```

### 3. Register in wrangler.toml

```toml
[triggers]
crons = ["*/5 * * * *"]
```

The cron handler in Next.js on Cloudflare Workers is invoked automatically.

---

## Summary Checklist

| Platform  | App Created | Credentials Set | OAuth Routes | UI Connected | Cron Publishing |
|-----------|-------------|-----------------|--------------|--------------|-----------------|
| Instagram | [ ]         | [ ]             | Done         | Done         | [ ]             |
| Facebook  | [ ] (same Meta app) | [ ]   | [ ]          | [ ]          | [ ]             |
| Reddit    | [ ]         | [ ]             | [ ]          | [ ]          | [ ]             |
| TikTok    | N/A (Late)  | [ ]             | N/A          | [ ]          | [ ]             |
