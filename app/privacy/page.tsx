import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Privacy Policy — Assurgit",
  description: "Privacy Policy for Assurgit and its services.",
};

export default function PrivacyPage() {
  const lastUpdated = "March 25, 2025";

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

              {/* 1 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
                <p>
                  Assurgit ("we," "us," or "our") is operated by Cyber ASA Software. We provide
                  AI-powered video content production and social media scheduling services at{" "}
                  <a href="https://assurgit.com" className="text-indigo-400 hover:underline">assurgit.com</a>.
                  This Privacy Policy explains how we collect, use, store, and share information when
                  you use our platform and connect third-party social media accounts.
                </p>
                <p className="mt-3">
                  Questions or requests regarding this policy can be directed to{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>.
                </p>
              </div>

              {/* 2 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                <p>We collect the following categories of information:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong className="text-white">Account information:</strong> Name, email address,
                    and hashed credentials when you create or manage an account.
                  </li>
                  <li>
                    <strong className="text-white">Project content:</strong> Video scripts, transcripts,
                    captions, titles, and media files you upload or generate through our platform.
                  </li>
                  <li>
                    <strong className="text-white">Social media credentials:</strong> OAuth access tokens
                    and refresh tokens for connected social media accounts (Instagram, YouTube, Reddit,
                    TikTok). These are used exclusively to publish content on your behalf and to refresh
                    expiring tokens automatically.
                  </li>
                  <li>
                    <strong className="text-white">Post performance metrics:</strong> Engagement data
                    (views, likes, comments, impressions) retrieved via platform APIs for your connected
                    accounts, used to display analytics within Assurgit.
                  </li>
                  <li>
                    <strong className="text-white">Technical data:</strong> IP address, browser type,
                    device information, operating system, referring URLs, and pages visited, collected
                    automatically when you use our platform.
                  </li>
                  <li>
                    <strong className="text-white">Communications:</strong> Messages you send us via
                    email or contact forms.
                  </li>
                </ul>
              </div>

              {/* 3 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To operate and deliver our platform, including scheduling and publishing social media posts on your behalf.</li>
                  <li>To refresh expiring access tokens for connected accounts so scheduled posts can be published without interruption.</li>
                  <li>To retrieve post performance metrics from connected platforms and display them in your analytics dashboard.</li>
                  <li>To send project review links, status notifications, and account-related communications.</li>
                  <li>To improve and debug our platform using aggregated, anonymized analytics.</li>
                  <li>To comply with legal obligations and enforce our Terms of Service.</li>
                </ul>
              </div>

              {/* 4 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Platform-Specific Data Access</h2>
                <p className="mb-4">
                  When you connect a social media account, we request the minimum permissions necessary to
                  publish your content. Here is exactly what we access on each platform and why:
                </p>

                {/* Instagram / Meta */}
                <div className="mb-5 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                  <h3 className="text-base font-semibold text-white mb-2">Instagram (Meta)</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm">
                    <li><strong className="text-gray-200">instagram_basic</strong> — Read your Instagram account username and profile picture to display your connected account within Assurgit.</li>
                    <li><strong className="text-gray-200">instagram_content_publish</strong> — Publish feed posts, Reels, and other media to your Instagram account on a schedule you control.</li>
                    <li><strong className="text-gray-200">instagram_manage_insights</strong> — Read post-level metrics (impressions, reach, likes, comments, shares) to populate your analytics dashboard.</li>
                    <li><strong className="text-gray-200">pages_read_engagement</strong> — Required by Meta when publishing to Instagram accounts connected to a Facebook Page.</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    We do not access your Instagram direct messages, Stories, followers list, or any data
                    beyond what is listed above. Meta data is never used for advertising or sold to third parties.
                  </p>
                </div>

                {/* YouTube */}
                <div className="mb-5 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                  <h3 className="text-base font-semibold text-white mb-2">YouTube (Google)</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm">
                    <li><strong className="text-gray-200">youtube.upload</strong> — Upload videos and Shorts to your YouTube channel on a schedule you control.</li>
                    <li><strong className="text-gray-200">youtube.readonly</strong> — Read video metadata and performance statistics (views, likes, comments) for uploaded videos to populate your analytics dashboard.</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    We do not access your YouTube subscriptions, watch history, playlists, or any other
                    data beyond what is listed above. Google/YouTube data is never used for advertising
                    or sold to third parties.
                  </p>
                </div>

                {/* Reddit */}
                <div className="mb-5 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                  <h3 className="text-base font-semibold text-white mb-2">Reddit</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm">
                    <li><strong className="text-gray-200">submit</strong> — Submit posts to subreddits on your behalf according to your schedule.</li>
                    <li><strong className="text-gray-200">identity</strong> — Read your Reddit username to display your connected account within Assurgit.</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    We do not access your Reddit inbox, saved posts, voting history, or any other data
                    beyond what is listed above. Reddit data is never used for advertising or sold to third parties.
                  </p>
                </div>

                {/* TikTok */}
                <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                  <h3 className="text-base font-semibold text-white mb-2">TikTok</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm">
                    <li><strong className="text-gray-200">video.upload</strong> — Upload short-form video content to your TikTok account on a schedule you control.</li>
                    <li><strong className="text-gray-200">user.info.basic</strong> — Read your TikTok username and avatar to display your connected account within Assurgit.</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    We do not access your TikTok messages, follower lists, likes, or any other data
                    beyond what is listed above. TikTok data is never used for advertising or sold to third parties.
                  </p>
                </div>
              </div>

              {/* 5 — YouTube API required disclosure */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. YouTube API Services</h2>
                <p>
                  Assurgit uses YouTube API Services to upload videos and retrieve performance data on your behalf.
                  By connecting your YouTube account, you agree to be bound by the{" "}
                  <a
                    href="https://www.youtube.com/t/terms"
                    className="text-indigo-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube Terms of Service
                  </a>
                  . Google's Privacy Policy, which governs how YouTube handles your data, is available at{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-indigo-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </p>
                <p className="mt-3">
                  You can revoke Assurgit's access to your Google account at any time by visiting{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    className="text-indigo-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Security Settings
                  </a>
                  {" "}or by disconnecting your account from within Assurgit. When access is revoked,
                  we permanently delete your YouTube access and refresh tokens from our systems.
                </p>
              </div>

              {/* 6 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Data Sharing</h2>
                <p>We do not sell your personal data. We share information only in the following circumstances:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong className="text-white">Infrastructure providers:</strong> Cloudflare, Inc.
                    (United States) — hosting, edge computing, database (D1), and media storage (R2).
                    Data is processed in accordance with Cloudflare's privacy practices.
                  </li>
                  <li>
                    <strong className="text-white">Social platforms:</strong> When you schedule a post,
                    the content (video, caption, title) is transmitted to the relevant platform's API
                    (Meta, Google/YouTube, Reddit, TikTok) according to your instructions.
                  </li>
                  <li>
                    <strong className="text-white">Analytics:</strong> Google Analytics (anonymized,
                    aggregated usage data) to understand platform usage. No personal social media data
                    is shared with Google Analytics.
                  </li>
                  <li>
                    <strong className="text-white">Legal requirements:</strong> If required by law,
                    court order, or to protect our legal rights or the safety of our users.
                  </li>
                </ul>
              </div>

              {/* 7 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Data Retention</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Account data:</strong> Retained for the lifetime of your account. Deleted within 30 days of an account deletion request.</li>
                  <li><strong className="text-white">Social media access tokens:</strong> Retained only while the account is connected. Deleted immediately upon disconnection or revocation.</li>
                  <li><strong className="text-white">Post content and scheduled posts:</strong> Retained until you delete them or your account is closed.</li>
                  <li><strong className="text-white">Post metrics:</strong> Retained for the lifetime of the associated post record.</li>
                  <li><strong className="text-white">Technical/log data:</strong> Retained for up to 90 days for security and debugging purposes.</li>
                </ul>
              </div>

              {/* 8 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. Data Deletion</h2>
                <p>
                  You have the right to request deletion of all personal data we hold about you. To do so:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong className="text-white">Email request:</strong> Send an email to{" "}
                    <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                      cyberasasoftware@gmail.com
                    </a>{" "}
                    with the subject "Data Deletion Request." We will process your request within 30 days.
                  </li>
                  <li>
                    <strong className="text-white">Disconnect social accounts:</strong> You can disconnect
                    any connected social account directly from the Assurgit dashboard or from the
                    platform's own settings (e.g.,{" "}
                    <a href="https://www.facebook.com/settings?tab=applications" className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">Facebook App Settings</a>
                    {" "}or{" "}
                    <a href="https://myaccount.google.com/permissions" className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Account Permissions</a>
                    ). Disconnecting immediately removes the access token from our systems.
                  </li>
                  <li>
                    <strong className="text-white">Meta automated deletion:</strong> If you remove
                    Assurgit from your Facebook app settings, Meta will automatically notify us and
                    we will delete your associated data. You can confirm deletion status at{" "}
                    <a href="https://assurgit.com/data-deletion" className="text-indigo-400 hover:underline">
                      assurgit.com/data-deletion
                    </a>
                    .
                  </li>
                </ul>
              </div>

              {/* 9 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">9. Your Rights and Account Control</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Access the personal data we hold about you.</li>
                  <li>Request correction of inaccurate data.</li>
                  <li>Request deletion of your data (see Section 8).</li>
                  <li>Object to or restrict certain processing activities.</li>
                  <li>Data portability — receive your data in a structured, machine-readable format.</li>
                  <li>Withdraw consent at any time without affecting the lawfulness of prior processing.</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, contact us at{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>. We will respond within 30 days.
                </p>
              </div>

              {/* 10 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">10. Cookies and Analytics</h2>
                <p>
                  We use Google Analytics to understand how visitors use our site. This may involve
                  cookies and collects anonymized, aggregated usage data (pages visited, session duration,
                  general geographic region). We do not share identifiable personal data with Google
                  Analytics. You can opt out using the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-indigo-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  {" "}or by adjusting your browser's cookie settings.
                </p>
                <p className="mt-3">
                  We also use session cookies strictly necessary to maintain your login session. These
                  cookies do not track you across other websites and are deleted when you log out or
                  close your browser.
                </p>
              </div>

              {/* 11 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">11. Security</h2>
                <p>
                  We use industry-standard security measures including HTTPS/TLS encryption for all data
                  in transit, hashed credentials, encrypted token storage, and role-based access controls.
                  Our infrastructure is hosted on Cloudflare's global network, which provides additional
                  DDoS protection and security monitoring.
                </p>
                <p className="mt-3">
                  No method of transmission over the internet is 100% secure. If you believe your
                  account has been compromised, please contact us immediately at{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>.
                </p>
              </div>

              {/* 12 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">12. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under 18 years of age. We do not
                  knowingly collect personal information from minors. If you believe a minor has
                  provided us with personal information, please contact us and we will delete it
                  promptly.
                </p>
              </div>

              {/* 13 — GDPR */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">13. EU/EEA Residents (GDPR)</h2>
                <p>
                  If you are located in the European Union or European Economic Area, the following
                  additional rights and disclosures apply under the General Data Protection Regulation
                  (GDPR):
                </p>
                <p className="mt-3 font-semibold text-white">Lawful bases for processing:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong className="text-gray-200">Contract performance:</strong> Processing necessary to deliver our services (publishing posts, managing accounts, providing analytics).</li>
                  <li><strong className="text-gray-200">Legitimate interests:</strong> Security monitoring, fraud prevention, and aggregated analytics to improve our platform.</li>
                  <li><strong className="text-gray-200">Consent:</strong> Connecting social media accounts and any optional communications you opt into.</li>
                  <li><strong className="text-gray-200">Legal obligation:</strong> Retaining records where required by law.</li>
                </ul>
                <p className="mt-3 font-semibold text-white">Sub-processors:</p>
                <p className="mt-1">
                  We use Cloudflare, Inc. (United States) as our primary infrastructure sub-processor.
                  Cloudflare participates in the EU-U.S. Data Privacy Framework. Data transfers to
                  the United States are covered by appropriate safeguards.
                </p>
                <p className="mt-3 font-semibold text-white">Supervisory authority:</p>
                <p className="mt-1">
                  You have the right to lodge a complaint with your local data protection supervisory
                  authority if you believe we have not handled your data lawfully.
                </p>
              </div>

              {/* 14 — CCPA */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">14. California Residents (CCPA/CPRA)</h2>
                <p>
                  If you are a California resident, you have additional rights under the California
                  Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-gray-200">Right to know:</strong> You may request details about the categories and specific pieces of personal information we have collected about you.</li>
                  <li><strong className="text-gray-200">Right to delete:</strong> You may request deletion of your personal information (see Section 8).</li>
                  <li><strong className="text-gray-200">Right to correct:</strong> You may request correction of inaccurate personal information.</li>
                  <li><strong className="text-gray-200">Right to opt out of sale:</strong> We do not sell or share your personal information for cross-context behavioral advertising.</li>
                  <li><strong className="text-gray-200">Right to non-discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>.
                </p>
              </div>

              {/* 15 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">15. Changes to This Policy</h2>
                <p>
                  We may update this policy from time to time. We will notify you of significant changes
                  by posting the new policy on this page with an updated date. If you have a connected
                  social account, we will also notify you by email. Continued use of the service after
                  changes constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* 16 */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">16. Contact</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <address className="not-italic mt-3 text-gray-400 space-y-1">
                  <p className="text-white font-medium">Cyber ASA Software</p>
                  <p>
                    <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                      cyberasasoftware@gmail.com
                    </a>
                  </p>
                  <p>
                    <a href="https://assurgit.com" className="text-indigo-400 hover:underline">
                      assurgit.com
                    </a>
                  </p>
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
