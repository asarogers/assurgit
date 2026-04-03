# Client Social Setup Guide
**Assurgit / VideoClone Studio — Internal SOP**
Version 1.0 · Provisioning via Cloudflare Email Routing + Resend
---

## Overview

This guide covers the complete workflow for setting up social media accounts on behalf of VideoClone Studio clients. The approach uses a temporary provisioning email alias on the `assurgit.com` domain, created via Cloudflare Email Routing. This keeps all account creation under your control during onboarding, then cleanly hands off to the client with no loose ends.

> **Core principle:** You create a forwarding alias (e.g. `mealprep@assurgit.com`) before touching any social platform. All accounts are registered under that alias. Once setup is complete, you transfer each account to the client's real email and delete the alias. The client ends up owning everything.

### What you need

- Cloudflare account with `assurgit.com` zone (already set up)
- Resend account with `assurgit.com` verified (already set up)
- Client's real email address
- Client's business name and handle preferences
- Client's profile photo / logo assets
- Client's bio copy
- Client's phone number for SMS verification

### Alias naming convention

Format: `[clientslug]@assurgit.com`

Examples: `mealprep@assurgit.com`, `smithplumbing@assurgit.com`, `janecoach@assurgit.com`

Keep slugs short, lowercase, no spaces. Match the client's primary brand keyword.

---

## Phase 1 — Create the Provisioning Alias

### Step 1.1 — Add alias in Cloudflare Email Routing

Cloudflare Email Routing is already active on `assurgit.com`. All you need to do is add a new forwarding rule for each client.

1. Log in to `dash.cloudflare.com`
2. Select the `assurgit.com` zone
3. Go to **Email → Email Routing → Routing Rules**
4. Click **Add address**
5. Custom address: enter the alias — e.g. `mealprep`
6. Destination: your personal inbox — e.g. `asa@youremail.com`
7. Click **Save**

> The alias is live instantly. Any email sent to `mealprep@assurgit.com` will forward to your inbox. No DNS changes needed — Cloudflare handles MX automatically.

### Step 1.2 — Verify the alias works

1. Send a test email to the new alias from any account
2. Confirm it arrives in your inbox within 30 seconds
3. If it doesn't arrive, check Cloudflare Email Routing is enabled on the zone

### Step 1.3 — Add sending identity in Resend (optional)

If you need to send outbound email from the alias during onboarding, add it as a sending identity in Resend.

1. Log in to `resend.com` → Domains
2. `assurgit.com` should already be verified — no new domain needed
3. When sending via Resend API, set `from:` to the alias address
4. Resend will send on behalf of that address using the verified domain

> In most cases you won't need to send outbound from the alias — most social platforms only require you to receive a verification email. Skip Resend setup unless a platform specifically requires replying from the alias address.

---

## Phase 2 — Create Social Accounts

### Pre-flight checklist

Before creating any accounts, confirm you have the following from the client:

- [ ] Alias email created and tested (Phase 1 complete)
- [ ] Client's preferred username / handle for each platform
- [ ] Profile photo (1:1 ratio, minimum 400×400px, PNG preferred)
- [ ] Cover / banner photo where required (1500×500px for Twitter/X, 820×312px for Facebook)
- [ ] Bio copy (150 chars max for Instagram, 160 for Twitter/X, 255 for TikTok)
- [ ] Website URL
- [ ] Business category / niche
- [ ] Client's phone number for SMS verification

> **Always use the client's real phone number for SMS-based 2FA. Never use your own.** If the number is ever needed to recover an account after handoff, it must belong to the client.

---

### Instagram

1. Go to `instagram.com` → Sign up
2. Email: enter the provisioning alias — e.g. `mealprep@assurgit.com`
3. Complete the verification email — check your forwarded inbox
4. Set username and password — use a strong generated password, save in your password manager tagged with the client name
5. Upload profile photo
6. Add bio, website URL, business category
7. Switch account type: **Profile → Settings → Account → Switch to Professional → Business**
8. Connect to a Facebook Page — create one if the client doesn't have one (see Facebook section)
9. Enable two-factor authentication — use client's phone number for SMS
10. Save login credentials in your password manager

> Instagram Business accounts must be connected to a Facebook Page to use the Graph API for posting via Assurgit's social pipeline. Do not skip step 8.

---

### Facebook

1. Go to `facebook.com` → Create new account
2. Email: use the same provisioning alias
3. Complete email verification
4. After account is created, go to `facebook.com/pages/create`
5. Create a Business/Brand page with the client's name
6. Upload profile photo and cover image
7. Add page category, bio, website
8. Go to **Page Settings → Instagram** → connect the Instagram account created above
9. Enable 2FA on the Facebook account using client's phone
10. Save credentials

> The Facebook personal account is only a container for the Page. The client only needs to interact with the Page in practice. Make this clear during handoff so they don't get confused by the personal account wrapper.

---

### TikTok

TikTok posting in Assurgit's pipeline goes through Late (`lateapp.co`) rather than the direct API. The TikTok account still needs to be created and connected to Late.

1. Go to `tiktok.com` → Sign up with email
2. Email: use the provisioning alias
3. Verify email
4. Set username, complete profile
5. Upload profile photo, add bio
6. Switch to Business Account: **Profile → Settings → Manage account → Switch to Business**
7. Log in to `lateapp.co` with your Assurgit Late account
8. Connect the new TikTok account to Late via Late's dashboard OAuth flow
9. Confirm the account appears in Late's connected accounts list
10. Save TikTok credentials

> TikTok's direct Content Posting API requires business review approval. Late handles this layer — that's why the account is connected through Late, not directly to Assurgit's pipeline.

---

### Reddit

1. Go to `reddit.com` → Sign up
2. Email: use the provisioning alias
3. Verify email
4. Choose a username (usually brand name or variation)
5. Complete profile: avatar, banner, bio
6. Add subreddits relevant to the client's niche
7. Enable 2FA: **User Settings → Safety & Privacy**
8. Go to `reddit.com/prefs/apps` → **Create another app**
9. Select **web app**, set redirect URI to `https://assurgit.com/api/social/reddit/callback`
10. Note the **Client ID** and **Client Secret** — these go into Assurgit's `.env`
11. Save all credentials

> Reddit is the only platform where you also need to create a developer app during setup. Steps 8–10 are required to enable Assurgit's Reddit OAuth posting route for this client.

---

## Phase 3 — Configure Assurgit Social Pipeline

Once all accounts are created, add the platform credentials to Assurgit's environment so the social posting pipeline can authenticate.

### Instagram / Facebook

1. Go to `developers.facebook.com` → your Assurgit Scheduler app
2. Add the client's Facebook account as a Tester under **App Roles**
3. Accept the tester invite (do it yourself while you still have alias access)
4. Run the OAuth flow at `/social` → Connect Instagram
5. Store the returned long-lived token in your `social_accounts` table
6. Run `GET /me/accounts` to retrieve the Facebook Page access token
7. Store Page token in `social_accounts` with `platform = 'facebook'`

### Reddit

1. Add `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` to `.env.local`
2. Add as Cloudflare secrets:

```bash
npx wrangler secret put REDDIT_CLIENT_ID
npx wrangler secret put REDDIT_CLIENT_SECRET
```

3. Run the Reddit OAuth flow for the client account
4. Store `access_token` and `refresh_token` in `social_accounts`

### TikTok (via Late)

1. Confirm the TikTok account is connected in Late's dashboard
2. Add `LATE_API_KEY` to `.env.local` and as a Cloudflare secret
3. Note the TikTok `accountId` from Late's API
4. Add a `social_accounts` row: `platform = 'tiktok'`, `external_id = Late accountId`

> Keep a separate `.env` file or 1Password entry per client containing their specific credentials. Never mix client credentials in a shared config.

---

## Phase 4 — Test the Pipeline

Before handing off, run one test post through Assurgit's pipeline for each connected platform. Use a clearly labelled test post that you will immediately delete.

- [ ] Instagram: `POST /api/social/instagram/post` with a test image and caption
- [ ] Facebook: `POST /api/social/facebook/post` with a test text update
- [ ] TikTok: `POST /api/social/tiktok/schedule` with a 10-second test clip via Late
- [ ] Reddit: `POST /api/social/reddit/post` with a test self post to `r/test`

Confirm each post appears on the platform and delete immediately after.

> If any platform returns an auth error, re-run the OAuth flow for that platform before proceeding to handoff. Do not hand off with a broken connection.

---

## Phase 5 — Transfer Accounts to Client

Transfer account emails in this order. Always complete Instagram/Facebook last, as they are linked.

### TikTok

1. Log in to TikTok with the provisioning alias
2. Go to **Profile → Settings → Account → Email**
3. Change email to client's real email address
4. Verify on both ends — alias receives old-email confirmation, client receives new-email verification
5. Confirm client can log in with their email

### Reddit

1. Log in to Reddit with the provisioning alias
2. Go to **User Settings → Account → Email**
3. Update to client's real email and verify
4. Reddit OAuth tokens are tied to the account, not the email — no need to re-auth after email change

### Instagram and Facebook

1. Update **Facebook** account email first: **Settings → General → Contact → Email**
2. Verify the new email from client's inbox
3. Update **Instagram** email: **Profile → Edit Profile → Personal Information → Email**
4. Verify Instagram email change
5. Transfer the Facebook Page admin role to client's personal Facebook account if they want direct page access

> Meta OAuth tokens are tied to the user account, not just the email. After transferring the Facebook account email, you may need to re-run the Instagram OAuth flow in Assurgit to refresh the token. Do this before closing out the client onboarding.

### Password and 2FA handoff

1. Share all generated passwords securely via 1Password share link or equivalent
2. Instruct client to change all passwords after receiving them
3. Walk client through their 2FA setup on each platform
4. Remove yourself as admin/tester from the Meta app
5. Confirm client has recovery codes saved for each platform that issued them

### Delete the provisioning alias

1. Go to Cloudflare → **Email → Email Routing → Routing Rules**
2. Find the client's alias rule
3. Click the three-dot menu → **Delete**
4. Confirm deletion

> Deleting the alias immediately stops all forwarding. Any future emails sent to the old alias will bounce. Make sure the client has transferred all platforms and confirmed access before deleting.

---

## Client Onboarding Tracker

Copy this section for each new client.

**Client:** _________________________ **Alias:** _________________________ **Date:** _____________

| Platform | Alias Used | Account Created | Email Transferred | Handed Off |
|---|---|---|---|---|
| Instagram | | ☐ Done | ☐ Done | ☐ Done |
| Facebook | | ☐ Done | ☐ Done | ☐ Done |
| TikTok (Late) | | ☐ Done | ☐ Done | ☐ Done |
| Reddit | | ☐ Done | ☐ Done | ☐ Done |

**Pipeline smoke tests**
- [ ] Instagram test post sent and deleted
- [ ] Facebook test post sent and deleted
- [ ] TikTok test clip posted via Late and deleted
- [ ] Reddit test post sent and deleted

**Handoff complete**
- [ ] All account emails transferred to client
- [ ] Passwords shared securely
- [ ] Client confirmed access to all platforms
- [ ] 2FA confirmed on all platforms
- [ ] Cloudflare alias deleted
- [ ] Assurgit `social_accounts` rows verified
- [ ] OAuth tokens refreshed after email transfer if needed

---

## Troubleshooting

### Verification email not arriving

- Check Cloudflare Email Routing is enabled: `dash.cloudflare.com → assurgit.com → Email → Email Routing` — should show **Enabled**
- Check the routing rule is **Active**, not Paused
- Check your spam/junk folder
- Some platforms delay verification emails by up to 5 minutes — wait before retrying
- Send a test email to the alias from Gmail to confirm forwarding is working independently

### OAuth token errors after email transfer

- Meta tokens can invalidate after account changes — re-run the OAuth flow at `/social → Connect Instagram`
- Reddit tokens do not invalidate on email change — no action needed
- TikTok tokens live in Late — check Late's dashboard if posting fails after transfer

### Platform account flagged during setup

- Space out account creation by at least 10 minutes between platforms
- Use the client's real phone number for SMS verification to reduce flag risk
- If an account is restricted, go through the platform's appeal flow — most resolve within 24 hours

### Client loses access after handoff

- Check the client has verified the email change on each platform — some require clicking a link before the change takes effect
- Check 2FA — is the client using the right authenticator app or phone number?
- Most platforms support account recovery via the verified email — if the client now owns the email, they can recover independently
- If needed, the alias can be temporarily re-created in Cloudflare to receive recovery emails while you assist

---

## Quick Reference

| Item | Detail |
|---|---|
| Cloudflare path | `dash.cloudflare.com → assurgit.com → Email → Email Routing → Routing Rules` |
| Alias format | `[clientslug]@assurgit.com` |
| Resend domain | `assurgit.com` (already verified) |
| Meta app name | Assurgit Scheduler (`developers.facebook.com`) |
| Reddit redirect URI | `https://assurgit.com/api/social/reddit/callback` |
| TikTok method | Via Late (`lateapp.co`) — not direct API |
| Late API key env var | `LATE_API_KEY` |
| Phone number rule | Always use client's real phone for 2FA — never yours |
| Delete alias when? | After client confirms access to all platforms |
| Token refresh when? | After any Meta account email change |
