# Setting up assurgit.com — Full Checklist

---

## 1. Namecheap (or registrar)

1. Log in at namecheap.com
2. **Domain List** → find `assurgit.com` → click **Manage**
3. Under **Nameservers**, select **Custom DNS**
4. Enter the two Cloudflare nameservers (you get these in Step 2 below)
   - e.g. `ada.ns.cloudflare.com`
   - e.g. `hugo.ns.cloudflare.com`
5. Click the green checkmark to save
6. Propagation takes a few minutes to a few hours

---

## 2. Cloudflare — Add Domain

1. Log in at cloudflare.com
2. **Add a site** → enter `assurgit.com` → Continue
3. Select the **Free** plan → Continue
4. Copy the **two nameservers** Cloudflare gives you
5. Paste them into your registrar (Step 1 above)
6. Click **Done, check nameservers**
7. Cloudflare will email you when the domain is active

---

## 3. Cloudflare — DNS Records

Go to: **Cloudflare Dashboard → assurgit.com → DNS → Records**

| Type  | Name | Target | Proxy |
|-------|------|--------|-------|
| CNAME | @    | `assurgit.founder-asa.workers.dev` | ✅ ON (orange cloud) |
| CNAME | www  | `assurgit.founder-asa.workers.dev` | ✅ ON (orange cloud) |

---

## 4. Deploy to Cloudflare

The project uses `@opennextjs/cloudflare` to build for the Workers runtime and `wrangler` to deploy.
Both are already installed as dev dependencies. The following files are already in the repo:

- `wrangler.toml` — Worker name (`assurgit`), entry point, assets binding
- `open-next.config.ts` — OpenNext adapter config

**First deploy — authenticate with Cloudflare:**
```bash
npx wrangler login
```

**Then deploy:**
```bash
npm run deploy
```

To verify the deploy worked:
```bash
grep -c 'case"server/chunks/ssr/' .open-next/server-functions/default/handler.mjs
```

The Worker will be live at `assurgit.founder-asa.workers.dev` after the first deploy.

---

## 5. Cloudflare — Add Custom Domain to Worker

The Worker must exist (Step 4) before you can attach a custom domain.

1. Go to **Workers & Pages** → click **assurgit**
2. Click **Settings** → **Domains & Routes**
3. Click **Add** → **Custom Domain**
4. Enter `assurgit.com` → Add domain
5. Repeat for `www.assurgit.com`
6. Cloudflare issues TLS certificate automatically

---

## 6. Google Analytics 4

1. Go to **analytics.google.com** → Create Account → Account name: `Assurgit`
2. Create Property → Property name: `assurgit.com` → Timezone: US → Currency: USD
3. Select platform: **Web**
4. Stream URL: `https://assurgit.com` → Stream name: `Assurgit`
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
6. Add it to your environment:

```bash
# In wrangler.toml under [vars]:
NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-XXXXXXXXXX"
```

Or locally in `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Mark these as conversions in GA4 console

After deploying, wait 24–48 hours for events to appear, then go to:
**Admin → Events** → toggle **Mark as conversion** for:
- `form_submit` — signup / waitlist submitted
- `demo_booked` — demo scheduled
- `pricing_click` — pricing plan clicked

---

## 7. Google Search Console

1. Go to **search.google.com/search-console**
2. Add property → enter `https://assurgit.com`
3. Verify via DNS TXT record (add in Cloudflare DNS, proxy OFF)
4. Submit sitemap: `https://assurgit.com/sitemap.xml`
5. Use URL Inspection → Request Indexing on the homepage

---

## 8. Microsoft Clarity (Free Heatmaps)

1. Go to **clarity.microsoft.com** → New project → `assurgit.com`
2. In Setup → select **Google Analytics** → paste Measurement ID
3. No code changes needed — links directly to GA4

---

## 9. UTM Links to Use

Add UTM tags any time you share your link. Use these:

| Channel | Link |
|---|---|
| LinkedIn profile | `https://assurgit.com?utm_source=linkedin&utm_medium=social&utm_campaign=linkedin-profile` |
| LinkedIn posts | `https://assurgit.com?utm_source=linkedin&utm_medium=organic-social&utm_campaign=linkedin-content` |
| LinkedIn DMs (outreach) | `https://assurgit.com?utm_source=linkedin&utm_medium=outreach&utm_campaign=linkedin-dm` |
| Cold email | `https://assurgit.com?utm_source=email&utm_medium=cold-email&utm_campaign=outreach` |
| Twitter/X | `https://assurgit.com?utm_source=twitter&utm_medium=social&utm_campaign=twitter-profile` |
| YouTube | `https://assurgit.com?utm_source=youtube&utm_medium=video&utm_campaign=youtube-channel` |
| ProductHunt | `https://assurgit.com?utm_source=producthunt&utm_medium=referral&utm_campaign=ph-launch` |
| Newsletter | `https://assurgit.com?utm_source=newsletter&utm_medium=email&utm_campaign=weekly` |
| Reddit | `https://assurgit.com?utm_source=reddit&utm_medium=community&utm_campaign=reddit` |

---

## 10. Client Outreach Setup

### Cold Email Infrastructure
1. **Domain warm-up**: Use `mail.assurgit.com` (add MX + SPF + DKIM records in Cloudflare)
2. **Email tool**: Instantly.ai or Smartlead — both handle warm-up + sequences
3. **Lead sourcing**: Apollo.io (find marketing directors, social media managers, agency owners)
4. **Sequence**: 5-touch over 14 days — intro → case study → objection → breakup → re-engage

### LinkedIn Outreach
1. Create LinkedIn Company Page for Assurgit
2. Post 3x/week: client results, before/after video stats, behind-the-scenes
3. DM ideal clients directly — marketing managers, agency owners, e-commerce brands
4. Connection request → value-first message → follow up with case study

### Target Client Profile
- Marketing managers at 10–200 person companies
- Social media managers at agencies
- E-commerce brand owners doing $500K–$5M/year
- Coaches, consultants, and service businesses wanting video presence
- Real estate agents, financial advisors, local service businesses

### Outreach Message Template (LinkedIn DM)
```
Hey [Name],

Saw you're managing content at [Company] — curious if video is something
you're trying to scale this year.

We build AI video systems that produce 7 branded videos/week using your
own avatar and voice clone, with scripts researched and written for your
niche. No studio time, no editing.

Would a quick look at how it works be useful?
```

---

## 11. Resend — Transactional Email

1. Go to resend.com → sign up
2. **Domains** → **Add Domain** → enter `assurgit.com`
3. Add DNS records in Cloudflare (proxy OFF)
4. Click **Verify** in Resend
5. **API Keys** → Create API key → copy it
6. Add as Wrangler secret:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM_EMAIL
# Value: Assurgit <noreply@assurgit.com>
```

---

## Quick Reference

| Item | Value |
|------|-------|
| Domain | assurgit.com |
| Cloudflare Worker | assurgit |
| Workers.dev URL | assurgit.founder-asa.workers.dev |
| Contact email | (set when ready) |
| Deploy command | `npm run deploy` |
