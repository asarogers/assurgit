# Meta App Review & Platform Compliance Guide
*Assurgit — assurgit.com*
*Last updated: March 25, 2025*

---

## What Was Built

### 1. Meta Data Deletion Callback
- **Endpoint:** `POST /api/social/data-deletion`
- **Purpose:** Hard technical requirement for Meta app review. When a user removes your app from Facebook Settings, Meta sends a signed POST request to this endpoint.
- **How it works:** Verifies the HMAC-SHA256 signature using `INSTAGRAM_APP_SECRET`, deletes the user's tokens and scheduled posts from the DB, returns a confirmation code.
- **Without this:** Meta will reject your app review automatically.

### 2. Data Deletion Status Page
- **URL:** `https://assurgit.com/data-deletion`
- **Purpose:** The URL Meta redirects users to after deletion. Shows a confirmation code. Also serves as a manual deletion request page.
- **Register this URL in:** Meta App Dashboard → Settings → Advanced → Data Deletion

### 3. Privacy Policy (Rewritten)
- **URL:** `https://assurgit.com/privacy`
- Per-platform permission disclosures (Instagram, YouTube, Reddit, TikTok) with exact OAuth scope names
- **YouTube API Services disclosure** — legally required by Google ToS, includes links to YouTube ToS and Google Privacy Policy + revocation URL
- GDPR section with lawful bases for each processing activity
- CCPA/CPRA section with California-specific rights
- Sub-processors named (Cloudflare, US)
- Token refresh disclosed (Instagram 60-day, YouTube refresh tokens)
- Specific data retention timelines per data type
- Meta automated deletion URL pointing to the callback endpoint
- Children's age set to 18

### 4. App Icon
- **File:** `/public/app-icon.svg` (1024×1024)
- Design: broadcast signal arcs above a geometric A letter (broadcast tower concept)
- Gradients: dark navy background (#1e1b4b → #07070f), indigo A with light-to-dark gradient

### 5. Privacy Policy Link on /connect
- Added to the bottom of the ConnectPortal component
- Meta reviewers check that the authorization page has a visible privacy policy link

---

## Action Items — Must Do Before App Review

### Immediate (blockers)

**Set INSTAGRAM_APP_SECRET as a Cloudflare secret**
```bash
wrangler secret put INSTAGRAM_APP_SECRET
```
The data deletion callback uses this to verify Meta's signed requests. Without it set in Cloudflare secrets, the endpoint will fail.

**Register the Data Deletion Callback URL in Meta Dashboard**
1. Go to Meta App Dashboard → Your App → Settings → Advanced
2. Set "Data Deletion Callback URL" to: `https://assurgit.com/api/social/data-deletion`
3. Set "Data Deletion Instructions URL" to: `https://assurgit.com/data-deletion`

**Register Privacy Policy URL in Meta Dashboard**
1. Meta App Dashboard → Settings → Basic
2. Set "Privacy Policy URL" to: `https://assurgit.com/privacy`
3. Set "Terms of Service URL" to: `https://assurgit.com/terms`

### Within 1–3 days

**Meta Business Verification**
- Go to: https://business.facebook.com/settings
- Verify your legal business name, address, and phone/domain
- Takes 1–5 business days to approve
- Required before Meta will flip your app to Live mode

**Record App Review Screencast**
Meta requires a video demonstrating:
1. The OAuth connection flow (user opens `/connect`, clicks Connect on Instagram, authorizes)
2. A post being scheduled and published to Instagram
- Keep it under 5 minutes, clear screen recording, no commentary needed
- Upload as unlisted YouTube video or MP4 in the review submission

**Submit Reddit API Access Request**
Reddit removed self-service OAuth for commercial apps in late 2024. You need formal approval.
- Go to: https://support.reddithelp.com/hc/en-us/requests/new?ticket_form_id=14868593862164
- Describe use case: scheduling and publishing posts to Reddit on behalf of clients
- Mention you need `submit` and `identity` scopes

### Ongoing

**Instagram Token Refresh (60-day expiry)**
Instagram access tokens expire every 60 days. There is currently no background job proactively refreshing them. If a token expires, ALL scheduled posts for that client will silently fail.
- The `refreshInstagramToken` function already exists in `/lib/social/instagram.ts`
- Need to add a weekly cron that refreshes any IG token expiring within the next 14 days
- Cron is already set up in `wrangler.toml` (runs every 2 minutes on the publish cron)
- Add token refresh logic to the publish cron, or create a separate daily cron

---

## Meta App Description (use this for review submission)

> Assurgit is a professional social media content scheduling and publishing platform for businesses. It enables agency operators to connect client social media accounts (Instagram, YouTube, Reddit, TikTok) via OAuth and schedule AI-generated video content for automated publishing at predefined times. All content is reviewed and approved by the client before any post is published. We request only the minimum permissions required: `instagram_content_publish` to publish posts, `instagram_basic` to display the connected account, and `instagram_manage_insights` to show post performance in the client's analytics dashboard. No user data is stored beyond access tokens, which are deleted immediately upon disconnection.

---

## Permissions Required Per Platform

### Instagram / Meta
| Permission | Purpose |
|---|---|
| `instagram_basic` | Read username and profile picture for account display |
| `instagram_content_publish` | Publish feed posts and Reels on schedule |
| `instagram_manage_insights` | Read post metrics (impressions, reach, likes, comments) for analytics |
| `pages_read_engagement` | Required by Meta when account is linked to a Facebook Page |

### YouTube / Google
| Scope | Purpose |
|---|---|
| `youtube.upload` | Upload videos and Shorts on schedule |
| `youtube.readonly` | Read video performance stats for analytics |

### Reddit
| Scope | Purpose |
|---|---|
| `submit` | Submit posts to chosen subreddits |
| `identity` | Read username for account display |

### TikTok
| Scope | Purpose |
|---|---|
| `video.upload` | Upload short-form videos on schedule |
| `user.info.basic` | Read username and avatar for account display |

---

## Platform Review URLs

| Platform | Review / Access URL |
|---|---|
| Meta App Review | https://developers.facebook.com/apps |
| Meta Business Verification | https://business.facebook.com/settings |
| Google API Console | https://console.cloud.google.com/apis/credentials |
| YouTube Data API | https://console.cloud.google.com/apis/library/youtube.googleapis.com |
| Reddit API Access | https://support.reddithelp.com/hc/en-us/requests/new?ticket_form_id=14868593862164 |
| TikTok Developer | https://developers.tiktok.com |
