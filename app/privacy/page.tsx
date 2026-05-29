import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  openGraph: {
    url: "https://assurgit.com/privacy",
    images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  title: "Privacy Policy — Assurgit",
  description:
    "How Assurgit collects, uses, stores, and shares your information when you use our done-for-you local presence service.",
  alternates: {
    canonical: "https://assurgit.com/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "April 30, 2026";

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="bg-gray-950 pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-invert prose-gray">
            <div className="space-y-10 text-gray-300 text-base leading-relaxed">

              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
                <p>
                  This Privacy Policy explains how <strong>Assurgit LLC</strong> (&ldquo;Assurgit,&rdquo;
                  &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, shares, and
                  protects information when you visit{" "}
                  <a href="https://assurgit.com" className="text-indigo-400 hover:underline">assurgit.com</a>{" "}
                  or subscribe to the Assurgit Service (the &ldquo;Service&rdquo;).
                </p>
                <p className="mt-3">Two categories of people are described:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Customers</strong> — businesses that subscribe to Assurgit.</li>
                  <li><strong>End users</strong> — visitors to a Customer&rsquo;s website that we operate
                    (typically the Customer&rsquo;s prospective clients).</li>
                </ul>
                <p className="mt-3">
                  This policy covers both. The{" "}
                  <a href="/terms" className="text-indigo-400 hover:underline">Terms of Service</a> govern
                  the contractual relationship; this Privacy Policy explains data practices.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                <p className="font-semibold text-white">From Customers (during signup and operation of the Service):</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Business name, owner name, business email, business phone</li>
                  <li>Business address (used for GBP, schema, citations)</li>
                  <li>Service offerings, target service area, hours, photos you provide</li>
                  <li>Existing accounts you authorize us to manage (Google Business Profile, Google Search Console, GA4, Bing Webmaster Tools, social platforms — see Section 4)</li>
                  <li>Billing information processed by Stripe (we do not store card numbers; we store Stripe customer/subscription IDs only)</li>
                  <li>Communications with us (email, support tickets, intake call notes)</li>
                </ul>
                <p className="mt-4 font-semibold text-white">From End users of the Customer&rsquo;s site:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Standard server-log data (IP address, user agent, referrer, timestamps)</li>
                  <li>Page views and interactions (via Google Analytics 4 if the Customer has it enabled)</li>
                  <li>Form submissions (name, email, phone, message — only when the End user voluntarily submits a contact or booking form)</li>
                  <li>Cookies set by Google Analytics, Google Tag Manager, and any third-party booking widget the Customer chooses to embed (Booksy, Fresha, Cal.com, etc.)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. How We Use Information</h2>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Build and operate the Customer&rsquo;s website, GBP, and citations</li>
                  <li>Process payments and recurring subscriptions through Stripe</li>
                  <li>Send the Customer transactional emails (receipts, scheduling, monthly reports, cancellation handoffs) via Resend</li>
                  <li>Forward End-user form submissions to the Customer for follow-up</li>
                  <li>Improve our internal tooling and templates (in aggregate, not at the per-Customer level)</li>
                  <li>Comply with legal obligations and enforce our{" "}
                    <a href="/terms" className="text-indigo-400 hover:underline">Terms</a></li>
                </ul>
                <p className="mt-3">
                  We do not sell personal information. We do not share End-user form submissions with
                  anyone other than the Customer who operates the site that received them.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Platform-Specific Data Access</h2>
                <p>
                  When you authorize Assurgit to operate accounts on platforms below, we receive an OAuth
                  token (or, where appropriate, are added as a Manager) and use it strictly to perform the
                  Service for your tier.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Google services</h3>
                <p>
                  Google Business Profile (Manager access — never Owner), Google Search Console (read +
                  sitemap submission), Google Analytics 4 (read), Google Indexing API (URL submission),
                  Google Maps Platform (where applicable for embeds). We never request Customer Owner
                  transfer of GBP and you can revoke our Manager access at any time from your Google
                  account settings.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Bing Webmaster Tools</h3>
                <p>
                  Sitemap submission and Bing IndexNow ping for new pages. No personal browsing data
                  flows to us from this integration.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Cloudflare</h3>
                <p>
                  Site hosting (Workers + R2 + D1), DDoS / WAF, automatic SSL. Cloudflare processes
                  End-user request metadata as our infrastructure provider; see Cloudflare&rsquo;s privacy
                  notice for details on its handling.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Stripe</h3>
                <p>
                  All payment processing. Stripe receives card and billing-address data directly from the
                  Customer; we receive only Stripe-issued customer and subscription IDs, last-4 / brand of
                  card (for display), invoice metadata, and webhook events. See Stripe&rsquo;s privacy notice
                  for their data handling.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Resend</h3>
                <p>
                  Transactional email delivery (receipts, intake scheduling, monthly reports, no-deposit
                  subscribe links). Resend stores recipient email addresses and message metadata for
                  delivery logging.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Booking platforms</h3>
                <p>
                  We embed your existing booking widget (Booksy, Fresha, Square Appointments, Cal.com,
                  Vagaro, GlossGenius, Calendly). Bookings submitted through these widgets are processed by
                  the booking provider you chose; their privacy notice governs that data.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Citation directories</h3>
                <p>
                  When we submit your business listing to directories such as Yelp, Apple Maps, Bing
                  Places, Foursquare, Yellow Pages, BBB, Manta, CitySquares, Nextdoor, Tupalo, Patch,
                  Thumbtack, Angi, OpenStreetMap, Wikidata, and similar, we transmit your published name /
                  address / phone / website / hours / category — the same data already public on your
                  site and GBP. Each directory&rsquo;s privacy practices are governed by that directory.
                </p>

                <h3 className="text-base font-bold text-white mt-5 mb-2">Social media platforms (Growth/Scale tiers)</h3>
                <p>
                  Where you authorize us to operate social posting on your behalf, we use OAuth-scoped
                  access to Instagram (Meta Graph API), Facebook Pages, TikTok Content Posting API,
                  Reddit, YouTube Data API, and other platforms as added. We post on your behalf only;
                  we do not read direct messages and do not download your followers list except where
                  required by the platform&rsquo;s API to perform the publishing action.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. YouTube API Services</h2>
                <p>
                  Where the Customer authorizes the YouTube integration, the Service uses YouTube API
                  Services in accordance with the{" "}
                  <a className="text-indigo-400 hover:underline" href="https://www.youtube.com/t/terms">
                    YouTube Terms of Service
                  </a>{" "}
                  and the{" "}
                  <a className="text-indigo-400 hover:underline" href="https://policies.google.com/privacy">
                    Google Privacy Policy
                  </a>. Customers may revoke our access at any time via the{" "}
                  <a className="text-indigo-400 hover:underline" href="https://security.google.com/settings/security/permissions">
                    Google security settings page
                  </a>. We use YouTube Data API only to upload videos you authorize, retrieve titles /
                  descriptions / thumbnails of those uploads, and read aggregate analytics. We do not use
                  YouTube data for any purpose other than performing the Service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Where Data Lives</h2>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Cloudflare D1</strong> (SQLite at the edge) — Customer billing state
                    (subscriptions, invoices), business profile data, citations queue, post schedule.</li>
                  <li><strong>Cloudflare R2</strong> — Customer-uploaded media (photos, logos) and
                    site-export bundles at cancellation.</li>
                  <li><strong>Postgres</strong> (operated by Assurgit) — research-pipeline data: keyword
                    scores, competitor crawls, SERP signals, voice-of-customer extracts. Used internally
                    to generate the deliverables you receive (monthly reports, content, etc.).</li>
                  <li><strong>Stripe</strong> — payment processing and subscription state of record.</li>
                  <li><strong>Resend</strong> — transactional email delivery logs (~30 days).</li>
                </ul>
                <p className="mt-3">
                  All data is stored in US regions of the listed providers. Communications between the
                  browser and our infrastructure are TLS-encrypted.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Data Sharing</h2>
                <p>We share information only as needed to operate the Service:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>With sub-processors listed in Section 4 (Cloudflare, Stripe, Resend, Google,
                    Bing, social platforms, citation directories, booking platforms)</li>
                  <li>With the Customer who operates a site, when an End user submits a form on that site</li>
                  <li>To comply with subpoenas, court orders, or other legal requests; we will notify
                    you of any such request unless prohibited by law</li>
                  <li>In connection with a business transfer (merger, acquisition, asset sale), under
                    confidentiality protections at least as strong as those in this policy</li>
                </ul>
                <p className="mt-3">
                  <strong>We do not sell personal information.</strong> We do not share End-user data for
                  advertising targeting outside the Customer&rsquo;s own marketing of their business.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. Data Retention</h2>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Customer billing data</strong> — kept for the duration of the subscription
                    plus 7 years (federal/state tax recordkeeping).</li>
                  <li><strong>Customer business data</strong> (NAP, services, content drafts, citations
                    list) — kept while the subscription is active. After cancellation, exported to the
                    Customer and deleted from production within 30 days unless retention is needed for
                    a dispute.</li>
                  <li><strong>End-user form submissions</strong> — held in our system for up to 90 days
                    after delivery to the Customer, then purged. Customers are responsible for retention
                    in their own systems thereafter.</li>
                  <li><strong>Server logs</strong> — typically 30 days, or longer where required by an
                    upstream provider (Cloudflare).</li>
                  <li><strong>OAuth tokens</strong> — stored only while you authorize the integration;
                    revoked when you cancel or remove our access.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">9. Data Deletion &amp; Customer Rights</h2>
                <p>
                  Customers may request deletion at any time by emailing{" "}
                  <a href="mailto:hello@assurgit.com" className="text-indigo-400 hover:underline">hello@assurgit.com</a>{" "}
                  from the email on file. We will:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Provide a complete export of your business content (zip or git push)</li>
                  <li>Remove our Manager access from your GBP and any other authorized accounts</li>
                  <li>Revoke any OAuth tokens we hold for your accounts</li>
                  <li>Delete your records from our production databases within 30 days, except for
                    minimal records we&rsquo;re legally required to retain (billing/tax)</li>
                </ul>
                <p className="mt-3">
                  See also our{" "}
                  <a href="/data-deletion" className="text-indigo-400 hover:underline">Data Deletion page</a>{" "}
                  for the platform-specific deletion request flow required by Meta and similar platforms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">10. Cookies &amp; Analytics</h2>
                <p>
                  On <strong>assurgit.com</strong> we use Google Analytics 4 to understand how visitors
                  reach and move through the marketing site. GA4 sets first-party cookies that record
                  anonymous device/browser fingerprints; we have not enabled cross-site advertising
                  features.
                </p>
                <p className="mt-3">
                  On <strong>Customer-operated sites</strong> we ship GA4 (linked to the Customer&rsquo;s
                  property), Google Search Console verification, and any embed the Customer requests
                  (booking widget, review widget, map). Each Customer site discloses these in its own
                  footer cookie notice.
                </p>
                <p className="mt-3">
                  You may opt out of analytics by enabling Do-Not-Track / Global Privacy Control in your
                  browser, or by installing the official{" "}
                  <a className="text-indigo-400 hover:underline" href="https://tools.google.com/dlpage/gaoptout">
                    Google Analytics opt-out add-on
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">11. Security</h2>
                <p>
                  We follow industry-standard practices: TLS in transit, encryption at rest where the
                  upstream provider supports it (Cloudflare R2/D1, Stripe, Resend), least-privilege
                  access controls, and rotation of API tokens on suspected exposure. Cardholder data is
                  handled exclusively by Stripe (PCI-DSS Level 1). No system is perfectly secure; if a
                  breach affects your data we will notify you within 72 hours of confirmation, in
                  accordance with applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">12. Children&rsquo;s Privacy</h2>
                <p>
                  The Service is intended for businesses operated by adults. We do not knowingly collect
                  personal information from anyone under 13 (or under 16 in the EEA). If we learn we
                  have inadvertently collected such information, we will delete it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">13. EU/EEA &amp; UK Residents (GDPR / UK GDPR)</h2>
                <p>
                  If you are in the EEA, UK, or Switzerland, you have rights under GDPR / UK GDPR
                  including: access, rectification, erasure, restriction, portability, objection, and
                  withdrawal of consent. Our lawful bases for processing are (i) performance of a
                  contract with you (the Service), (ii) legitimate interests in operating and improving
                  the Service, and (iii) compliance with legal obligations.
                </p>
                <p className="mt-3">
                  To exercise any of these rights, email{" "}
                  <a href="mailto:hello@assurgit.com" className="text-indigo-400 hover:underline">hello@assurgit.com</a>.
                  You also have the right to lodge a complaint with your local data protection authority.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">14. California Residents (CCPA / CPRA)</h2>
                <p>
                  California residents have the right to know what personal information we collect, the
                  sources of that information, the purposes of collection, and the categories of third
                  parties with whom we share it (all described above). You also have the right to delete,
                  to correct, and to non-discrimination for exercising your rights.
                </p>
                <p className="mt-3">
                  We do <strong>not</strong> sell personal information and do not share it for
                  cross-context behavioral advertising. To exercise CCPA rights, email{" "}
                  <a href="mailto:hello@assurgit.com" className="text-indigo-400 hover:underline">hello@assurgit.com</a>{" "}
                  with subject line &ldquo;CCPA request.&rdquo;
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">15. International Transfers</h2>
                <p>
                  We are based in the United States and our infrastructure providers (Cloudflare, Stripe,
                  Resend, Google) operate primarily in the US. If you access the Service from outside
                  the US, you understand that your information will be transferred to and processed in
                  the US, where data-protection laws may differ from those in your jurisdiction.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">16. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date
                  at the top reflects the most recent revision. Material changes will be communicated to
                  Customers via email at least 30 days before they take effect.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">17. Contact</h2>
                <p>For questions about this Privacy Policy or your data:</p>
                <address className="not-italic mt-3 text-gray-400">
                  Assurgit LLC<br />
                  <a href="mailto:hello@assurgit.com" className="text-indigo-400 hover:underline">
                    hello@assurgit.com
                  </a>
                </address>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
