import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Assurgit",
  description: "Terms of Service for Assurgit and its AI video content services.",
};

export default function TermsPage() {
  const lastUpdated = "March 25, 2025";

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
                  By accessing or using Assurgit (the "Service"), operated by Cyber ASA Software ("we," "us," or "our"),
                  you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
                  Questions may be directed to{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
                <p>
                  Assurgit is an AI-powered video content production platform. We use your personal avatar, voice clone,
                  and market research to produce branded short-form videos and publish them to connected social media
                  platforms (Instagram, TikTok, LinkedIn, YouTube) on a scheduled basis. Specific deliverables and
                  posting frequency are defined in your subscription plan.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Eligibility</h2>
                <p>
                  You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use
                  the Service. By using Assurgit, you represent and warrant that you meet these requirements.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Accounts and Access</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all
                  activity that occurs under your account. You agree to notify us immediately of any unauthorized use.
                  We reserve the right to suspend or terminate accounts that violate these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Subscriptions and Payment</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscriptions are billed monthly at the rate of your selected plan (Starter, Growth, or Scale).</li>
                  <li>All fees are due in advance and are non-refundable except as required by law or as described below.</li>
                  <li>We reserve the right to change pricing with 30 days' written notice to active subscribers.</li>
                  <li>Failure to pay may result in suspension or termination of your account.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Cancellation and Refunds</h2>
                <p>
                  You may cancel your subscription at any time by contacting us at{" "}
                  <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                    cyberasasoftware@gmail.com
                  </a>. Cancellation takes effect at the end of the current billing period. We do not provide
                  prorated refunds for unused portions of a billing cycle. If you are unsatisfied with the Service,
                  contact us within the first 7 days of your subscription and we will work to make it right.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Your Content and Licenses</h2>
                <p>
                  You retain ownership of all content you provide to us, including your likeness, voice recordings,
                  brand assets, and any other materials ("Your Content"). By using the Service, you grant Cyber ASA
                  Software a limited, non-exclusive license to use Your Content solely to produce and deliver the
                  videos you request. We will not use Your Content for any other purpose without your explicit consent.
                </p>
                <p className="mt-3">
                  You represent and warrant that you have all rights necessary to grant this license, and that Your
                  Content does not infringe the intellectual property rights or other rights of any third party.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. AI-Generated Content</h2>
                <p>
                  Videos produced through the Service are generated using artificial intelligence. You are responsible
                  for reviewing all content before it is published and for ensuring it is accurate, appropriate, and
                  compliant with all applicable laws and platform policies. We make no guarantee that AI-generated
                  content will be free of errors, inaccuracies, or unintended outputs.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">9. Social Media Integrations</h2>
                <p>
                  The Service connects to third-party social media platforms via OAuth. By authorizing these
                  connections, you agree to the terms of service of those platforms. We publish content on your behalf
                  only as you instruct. We are not responsible for any actions taken by social media platforms,
                  including account suspension, content removal, or policy changes that affect your account.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">10. Prohibited Use</h2>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Produce or distribute content that is unlawful, defamatory, fraudulent, or deceptive.</li>
                  <li>Impersonate any person or entity without their consent.</li>
                  <li>Violate the intellectual property rights of any third party.</li>
                  <li>Engage in spam, unsolicited advertising, or mass posting.</li>
                  <li>Attempt to reverse engineer, disrupt, or gain unauthorized access to the Service.</li>
                  <li>Violate any applicable local, national, or international law or regulation.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">11. Intellectual Property</h2>
                <p>
                  All rights in the Assurgit platform, including software, design, trademarks, and processes, are
                  owned by Cyber ASA Software. Nothing in these Terms transfers any of these rights to you. You may
                  not copy, modify, distribute, or create derivative works from the platform without our express
                  written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">12. Disclaimer of Warranties</h2>
                <p>
                  The Service is provided "as is" and "as available" without warranties of any kind, express or
                  implied. We do not warrant that the Service will be uninterrupted, error-free, or that any
                  AI-generated content will meet your specific requirements or expectations. Your use of the Service
                  is at your own risk.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">13. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Cyber ASA Software shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages arising out of your use of the Service,
                  including but not limited to loss of revenue, loss of data, or reputational harm. Our total
                  liability to you for any claim shall not exceed the amount you paid us in the three months preceding
                  the claim.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">14. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Cyber ASA Software and its affiliates from any claims,
                  damages, losses, and expenses (including reasonable legal fees) arising from your use of the
                  Service, Your Content, or your violation of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">15. Termination</h2>
                <p>
                  We may suspend or terminate your access to the Service at any time, with or without notice, if we
                  believe you have violated these Terms or for any other reason at our sole discretion. Upon
                  termination, your right to use the Service ceases immediately. Sections 7, 11, 12, 13, and 14
                  survive termination.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">16. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of the jurisdiction in which Cyber ASA Software operates,
                  without regard to conflict of law principles. Any disputes shall be resolved through binding
                  arbitration or in the courts of that jurisdiction, and you consent to personal jurisdiction there.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">17. Changes to Terms</h2>
                <p>
                  We may update these Terms from time to time. We will notify active subscribers of material changes
                  by email or by posting a notice within the Service. Continued use of the Service after changes
                  become effective constitutes your acceptance of the new Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">18. Contact</h2>
                <p>
                  For questions about these Terms of Service, contact us at:
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
