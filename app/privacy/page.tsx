import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Assurgit",
  description: "Privacy Policy for Assurgit and its services.",
};

export default function PrivacyPage() {
  const lastUpdated = "March 23, 2025";

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
                  Assurgit ("we," "us," or "our") is operated by Cyber ASA Software. We provide AI-powered video content
                  production and content management services at{" "}
                  <a href="https://assurgit.com" className="text-indigo-400 hover:underline">assurgit.com</a>.
                  Questions about this policy can be directed to{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                <p>We collect the following types of information:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong className="text-white">Account information:</strong> Name, email address, and password when you create an account.</li>
                  <li><strong className="text-white">Project content:</strong> Video scripts, transcripts, captions, and media files you upload or generate through our platform.</li>
                  <li><strong className="text-white">Social media tokens:</strong> OAuth access tokens for connected social media accounts (Instagram, Facebook, Reddit, TikTok) used solely to post content on your behalf.</li>
                  <li><strong className="text-white">Usage data:</strong> Pages visited, actions taken, and browser/device information collected via analytics.</li>
                  <li><strong className="text-white">Communications:</strong> Messages you send us via email or contact forms.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To deliver and operate our services, including publishing scheduled social media posts on your behalf.</li>
                  <li>To send project review links and notifications to your clients.</li>
                  <li>To communicate with you about your account, updates, and support.</li>
                  <li>To improve our platform through aggregated, anonymized analytics.</li>
                  <li>To comply with legal obligations.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Social Media Integrations</h2>
                <p>
                  When you connect a social media account (e.g., Instagram via Meta), we receive and store an OAuth access
                  token. This token is used exclusively to publish content you schedule through Assurgit. We do not sell,
                  share, or use these tokens for any other purpose. You can revoke access at any time from within Assurgit
                  or directly from the connected platform's settings.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing</h2>
                <p>We do not sell your personal data. We may share information with:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong className="text-white">Service providers:</strong> Cloudflare (hosting and database), and other infrastructure providers necessary to operate the platform.</li>
                  <li><strong className="text-white">Social platforms:</strong> When publishing content, data is sent to the relevant platform's API (Meta, Reddit, TikTok) per your instructions.</li>
                  <li><strong className="text-white">Legal requirements:</strong> If required by law, court order, or to protect our rights.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
                <p>
                  We retain your data for as long as your account is active or as needed to provide services. You may
                  request deletion of your account and associated data at any time by emailing{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>. Social media tokens are deleted immediately when you disconnect an account.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Data Deletion</h2>
                <p>
                  To request deletion of your personal data, email us at{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>{" "}
                  with the subject line "Data Deletion Request." We will process your request within 30 days and confirm
                  deletion. You may also disconnect any connected social accounts directly from the Assurgit dashboard,
                  which immediately removes the associated access tokens from our systems.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. Cookies and Analytics</h2>
                <p>
                  We use Google Analytics to understand how visitors use our site. This may involve cookies and collects
                  anonymized usage data. You can opt out by using browser extensions such as the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-indigo-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">9. Security</h2>
                <p>
                  We use industry-standard security measures including HTTPS encryption, hashed credentials, and access
                  controls. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">10. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under 13 years of age. We do not knowingly collect personal
                  information from children.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">11. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Access the personal data we hold about you.</li>
                  <li>Request correction of inaccurate data.</li>
                  <li>Request deletion of your data.</li>
                  <li>Object to or restrict certain processing.</li>
                  <li>Data portability.</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, contact us at{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">12. Changes to This Policy</h2>
                <p>
                  We may update this policy from time to time. We will notify you of significant changes by posting the
                  new policy on this page with an updated date. Continued use of the service after changes constitutes
                  acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">13. Contact</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <address className="not-italic mt-3 text-gray-400">
                  Cyber ASA Software<br />
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
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
