import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="" width={32} height={32} className="w-8 h-8" />
              <span className="font-mono font-black text-xl text-white tracking-tight">
                Assurgit
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-5">
              A done-for-you local presence system for single-location and small multi-location service businesses. Custom site, GBP management, and local SEO — from $189/month.
            </p>
            <Link
              href="/book"
              className="inline-block bg-brand-accent hover:bg-brand-accent-hov text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Book a 15-min Call →
            </Link>
          </div>

          {/* Who We Help */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Who We Help
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/for/business-coaches", label: "Coaches" },
                { href: "/for/real-estate-agents", label: "Real Estate Agents" },
                { href: "/for/financial-advisors", label: "Financial Advisors" },
                { href: "/for/loan-officers", label: "Loan Officers" },
                { href: "/for/attorneys", label: "Attorneys" },
                { href: "/for/consultants", label: "Consultants" },
                { href: "/for/personal-trainers", label: "Personal Trainers" },
                { href: "/for/mortgage-brokers", label: "Mortgage Brokers" },
                { href: "/for/chiropractors", label: "Chiropractors" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare & Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Compare & Learn
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/compare/done-for-you-vs-diy-video", label: "Done-For-You vs. DIY" },
                { href: "/compare/assurgit-vs-heygen", label: "vs. HeyGen" },
                { href: "/compare/assurgit-vs-synthesia", label: "vs. Synthesia" },
                { href: "/compare/assurgit-vs-marketing-agency", label: "vs. Marketing Agency" },
                { href: "/compare/assurgit-vs-freelance-video-editor", label: "vs. Freelance Editor" },
                { href: "/best/done-for-you-ai-video-service", label: "Best Local SEO Services" },
                { href: "/best/ai-avatar-service-for-business", label: "Best GBP Services" },
                { href: "/case-studies", label: "Case Studies" },
                { href: "/blog", label: "Blog & Guides" },
                { href: "/tools", label: "Free Tools" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate & Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5 mb-8">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/pricing", label: "Pricing — from $189" },
                { href: "/local-seo", label: "Local SEO" },
                { href: "/pricing", label: "Get started" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/onboard", label: "Client Onboarding" },
                { href: "/login", label: "Client Login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Assurgit. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center sm:text-right">
            Done-for-you local SEO, Google Business Profile, and websites for US service businesses. You own everything we build.
          </p>
        </div>
      </div>
    </footer>
  );
}
