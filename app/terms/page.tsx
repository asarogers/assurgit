import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  openGraph: {
    url: "https://assurgit.com/terms",
    images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  title: "Terms of Service — Assurgit",
  description:
    "Terms of Service for Assurgit's done-for-you local presence service: websites, Google Business Profile management, citations, and ongoing local SEO.",
  alternates: {
    canonical: "https://assurgit.com/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "April 30, 2026";

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="bg-gray-950 pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-invert prose-gray">
            <div className="space-y-10 text-gray-300 text-base leading-relaxed">

              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
                <p>
                  By signing up for, paying a deposit toward, or using any service offered by Assurgit
                  (the &ldquo;Service&rdquo;), operated by <strong>Assurgit LLC</strong> (&ldquo;Assurgit,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), you
                  (&ldquo;Customer,&rdquo; &ldquo;you,&rdquo; &ldquo;your&rdquo;) agree to be bound by these Terms of Service and our{" "}
                  <a href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</a>.
                  If you do not agree, do not subscribe.
                </p>
                <p className="mt-3">
                  Questions:{" "}
                  <a href="mailto:hello@assurgit.com" className="text-indigo-400 hover:underline">hello@assurgit.com</a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. The Service</h2>
                <p>
                  Assurgit is a done-for-you local-presence service for small US-based service businesses.
                  Depending on your subscribed tier (Starter, Growth, or Scale), the Service includes some
                  combination of: a custom-built website hosted on Cloudflare, Google Business Profile
                  (&ldquo;GBP&rdquo;) setup and ongoing optimization, schema markup, sitemap submission,
                  directory citations, review request automation, content edits, blog content, and monthly
                  reporting. The exact deliverables for your tier are described on the public pricing
                  page (<a href="/pricing" className="text-indigo-400 hover:underline">assurgit.com/pricing</a>)
                  at the time you subscribed and are incorporated by reference into these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Eligibility</h2>
                <p>
                  You must be at least 18 years old, authorized to bind the business you represent, and
                  operate a legal US-based service business. We reserve the right to refuse or terminate
                  service to businesses in industries we cannot competently serve or that violate Google&rsquo;s
                  Business Profile policies (e.g., gambling, adult content, prohibited products).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Setup Deposit</h2>
                <p>
                  Each tier requires a one-time, <strong>non-refundable</strong> setup deposit at signup:
                  <strong> $97 for Starter</strong>, <strong>$148 for Growth</strong>, <strong>$324 for Scale</strong>. The
                  deposit covers labor performed before your first monthly invoice — site scaffolding,
                  schema, citation kickoff, GBP setup, research, and content drafting.
                </p>
                <p className="mt-3">
                  If you cancel during onboarding before your site goes live, the deposit is retained, but
                  you keep all work product produced to that point (code drafts, research, content) as a
                  free export. The deposit is not credited against future months and is not refundable for
                  any reason except as stated in Section 9 (Material-Failure Exception).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Subscription Plans &amp; Billing</h2>
                <p>
                  Monthly subscription pricing as of the date of these Terms:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Starter: $189/month</li>
                  <li>Growth: $297/month</li>
                  <li>Scale: $649/month</li>
                </ul>
                <p className="mt-3">
                  Annual prepay at any tier is offered at <strong>twelve months for the price of ten</strong>{" "}
                  (~17% off) and is billed once at signup for the full year. Annual prepayments are
                  non-refundable past the initial-term equivalent for that tier (see Section 8).
                </p>
                <p className="mt-3">
                  All payments are processed by Stripe, Inc. By subscribing, you authorize Assurgit to charge
                  the payment method you provide for the deposit, the recurring subscription, and any
                  add-ons you order. Subscription pricing may change with at least 30 days&rsquo; notice; the new
                  price applies on your next renewal.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Setup Window &amp; Recurring Billing Start</h2>
                <p>
                  Your subscription begins with a <strong>7-day setup trial</strong> after the deposit is paid.
                  Recurring monthly billing does not begin during this period. We aim to launch your site
                  within 1–2 weeks of intake; once the site is live, we end the trial and the first monthly
                  charge is processed (or, on annual plans, the prepayment authorization is finalized).
                </p>
                <p className="mt-3">
                  If launch is materially delayed beyond 14 days due to a delay on our side, the trial is
                  extended at our discretion until launch. If the delay is on your side (e.g., we are
                  awaiting required information, GBP access, or content from you), the trial may end on its
                  scheduled date and recurring billing may begin even if the site has not yet launched.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Pause Option</h2>
                <p>
                  Any tier may be paused for up to 90 days at <strong>$49/month</strong> (hosting-only hold).
                  During a pause, your site stays live with security and backups; SEO, GBP, content, and
                  citations work pauses. You may resume at your previous tier with no new deposit and no
                  re-onboarding. After 90 days, you must resume or cancel; we do not extend pauses
                  indefinitely.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. Cancellation &amp; Notice</h2>
                <p>
                  <strong>Starter</strong> is month-to-month from day one with <strong>7 days&rsquo; notice</strong> required
                  before your renewal date.
                </p>
                <p className="mt-3">
                  <strong>Growth and Scale</strong> have a <strong>3-month initial term</strong> beginning on the day
                  your site goes live. After the initial term, both convert to month-to-month with{" "}
                  <strong>30 days&rsquo; notice</strong>. If you give notice during months 1–3 of the initial term,
                  you remain billed through month 3 and we continue working until handoff at the end of month 3.
                </p>
                <p className="mt-3">
                  All cancellations take effect at the end of the current billing cycle. There is no
                  cancellation fee, transition fee, or contract clause beyond the initial term. To cancel,
                  email <a href="mailto:hello@assurgit.com" className="text-indigo-400 hover:underline">hello@assurgit.com</a> from
                  the email address on file or use the Stripe Customer Portal link provided in any invoice.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">9. Material-Failure Exception</h2>
                <p>
                  If we materially fail to deliver what is described on the pricing page for your tier — for
                  example, the site never goes live, GBP is never set up, or no monthly report is sent for
                  two consecutive billing cycles — you may cancel without paying any remaining initial-term
                  balance, and we will refund the unearned portion of any annual prepayment. This is not a
                  results guarantee (see Section 14); it is a delivery guarantee on the work itself.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">10. You Own What We Build</h2>
                <p>
                  All deliverables produced for you under the Service — your domain, website source code,
                  content (blog posts, service pages, copy), photos, your Google Business Profile, your
                  citations list, your analytics and Search Console data — are owned by you from day one.
                  We work as <strong>Manager</strong> on your GBP, never Owner, and you can revoke our
                  Manager access at any time.
                </p>
                <p className="mt-3">
                  At cancellation, automatically and at no charge, we provide: a complete code &amp; content
                  export (zip or git push), the citations list with logins where applicable, a GBP handoff
                  document, and a short Loom walkthrough explaining how the pieces are wired. Optional paid
                  migration assistance ($200–$500) is available if you would prefer we move the site to a
                  new host on your behalf.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">11. Google Business Profile Access</h2>
                <p>
                  We require Manager access on your Google Business Profile to perform GBP-related work
                  (Growth and Scale tiers). You retain Owner access at all times. We will not transfer
                  primary ownership of your GBP, register a GBP in our name on your behalf, or take any
                  action that would make recovery of your profile contingent on our cooperation.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">12. Content &amp; Approvals</h2>
                <p>
                  We draft blog posts, service pages, GBP posts, and review responses on your behalf. On
                  Growth and Scale tiers, you receive drafts for approval before publish. By approving (or
                  failing to disapprove within 48 business hours of receipt), you authorize publication.
                  You are responsible for the accuracy of business information you provide (NAP, services,
                  hours, pricing); we will publish based on what you supply and edit upon notification of
                  errors.
                </p>
                <p className="mt-3">
                  Some content is AI-assisted (drafted with Claude, GPT, or similar tools and edited by
                  us before publish). You agree that AI-assisted content drafted for you on these terms is
                  acceptable and that we make no separate representation about its provenance beyond what
                  is disclosed here.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">13. Add-Ons &amp; Out-of-Scope Work</h2>
                <p>
                  Items not included in your tier — additional pages beyond your tier&rsquo;s page count, custom
                  functionality (forms, integrations, members areas, e-commerce), full redesigns,
                  photography, paid-ads management (Google Ads, LSAs, Meta), additional physical locations,
                  multi-language builds, video editing of footage you provide — are quoted and billed
                  separately as one-time projects or monthly add-ons.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">14. No Guarantee of Search Rankings</h2>
                <p>
                  We do not, and cannot lawfully, guarantee any specific search ranking, page-1 placement,
                  3-pack inclusion, or volume of leads or calls. Google and Bing search algorithms have
                  many factors that are outside our control. We commit to performing the work described in
                  your tier in good faith and to industry-accepted (&ldquo;white-hat&rdquo;) practices. Any
                  marketing copy describing typical or expected timelines is a forecast, not a guarantee.
                </p>
                <p className="mt-3">
                  Where we offer a published guarantee on the website (for example, &ldquo;Page 1 in 90
                  days — or your fourth month is free&rdquo;), the specific terms of that guarantee — what
                  qualifies, how it&rsquo;s measured, what remedy applies — are described on the page that makes
                  the offer and are incorporated by reference. In any conflict between marketing copy and
                  these Terms, these Terms control.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">15. Acceptable Use</h2>
                <p>
                  You agree not to use the Service for any purpose that is unlawful, infringes third-party
                  rights, attempts to manipulate search engines using prohibited tactics (PBN backlinks,
                  cloaking, paid-link networks), generates fake reviews, or violates Google&rsquo;s or any
                  directory&rsquo;s posted policies. We will refuse to perform work that we believe in good
                  faith would violate these policies, even if you request it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">16. Intellectual Property</h2>
                <p>
                  We retain ownership of our underlying templates, scaffolding, automation tooling, and
                  the systems used to produce deliverables. You receive a perpetual, royalty-free license
                  to use, modify, and re-host the deliverables produced for you (including the website
                  source code) at any time, with or without our involvement. Our automation tooling,
                  internal processes, and proprietary scoring/scraping pipelines are not transferred.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">17. Third-Party Services</h2>
                <p>
                  The Service integrates with third parties including (without limitation) Google
                  (Analytics, Search Console, Business Profile, Indexing API), Bing Webmaster Tools,
                  Cloudflare (hosting, CDN, R2, D1), Stripe (payments and billing portal), Resend (email),
                  Cal.com / Booksy / Fresha / Square / Vagaro / GlossGenius (booking integrations),
                  citation directories (Yelp, Foursquare, Apple Maps, BBB, etc.), and others. You are
                  responsible for accepting the terms of any third-party account in your name. Service
                  availability and the behavior of those integrations are subject to the third party&rsquo;s
                  policies and uptime, which we do not control.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">18. Confidentiality &amp; Data</h2>
                <p>
                  Each party will treat non-public information of the other as confidential and use it only
                  to perform the Service. Customer business data (NAP, service catalogs, analytics) is
                  stored on Cloudflare (D1) and Postgres and accessed only by Assurgit personnel and
                  automated agents acting on your behalf. We will not sell or provide your data to third
                  parties except as required to operate the Service or comply with law. See our{" "}
                  <a href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</a> for
                  additional detail.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">19. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE.&rdquo; ASSURGIT DISCLAIMS ALL
                  WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT THE SERVICE WILL ACHIEVE ANY
                  PARTICULAR SEARCH RANKING, LEAD VOLUME, REVENUE, OR BUSINESS RESULT. WE DO NOT WARRANT
                  THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE. THIRD-PARTY SERVICE OUTAGES, GOOGLE
                  POLICY CHANGES, AND ALGORITHM UPDATES ARE OUT OF OUR CONTROL.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">20. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, ASSURGIT&rsquo;S TOTAL CUMULATIVE LIABILITY ARISING OUT
                  OF OR RELATED TO THESE TERMS OR THE SERVICE — INCLUDING IN CONTRACT, TORT (INCLUDING
                  NEGLIGENCE), OR ANY OTHER THEORY — WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU
                  PAID US FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR
                  (B) $500. WE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                  PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, OR LOST RANKINGS, EVEN IF WE HAVE
                  BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">21. Indemnification</h2>
                <p>
                  You agree to indemnify and hold Assurgit harmless from any third-party claim arising from
                  (a) information you provide that turns out to be inaccurate or that infringes
                  third-party rights, (b) your business&rsquo;s products or services, (c) your violation of
                  these Terms or any third-party policy (e.g., Google&rsquo;s GBP policies), or (d) any content,
                  photo, or branding asset you supply for publication.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">22. Termination by Assurgit</h2>
                <p>
                  We may suspend or terminate the Service for material breach of these Terms (including
                  non-payment, misuse, or attempts to require us to perform work that violates third-party
                  policies). On termination by us for cause, the deposit and any paid initial-term amounts
                  are non-refundable. We will still provide the standard cancellation handoff described in
                  Section 10.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">23. Modifications to the Service or These Terms</h2>
                <p>
                  We may modify the Service or these Terms with at least 30 days&rsquo; notice for material
                  changes (changes affecting price, deliverables, cancellation rules, or your data
                  rights). Notice will be sent to the email address on file. Continued use of the Service
                  after the effective date of a modification constitutes acceptance.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">24. Governing Law &amp; Dispute Resolution</h2>
                <p>
                  These Terms are governed by the laws of the State of California, without regard to
                  conflict-of-law principles. Any dispute arising out of or relating to these Terms or the
                  Service shall be brought exclusively in the state or federal courts located in San
                  Francisco County, California, and the parties consent to that jurisdiction. Each party
                  waives any objection to venue in those courts.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">25. Contact</h2>
                <p>For questions about these Terms or the Service, contact us at:</p>
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
