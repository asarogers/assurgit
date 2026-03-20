import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-mono font-black text-xl text-white tracking-tight">
                Assurgit
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Done-for-you AI video content. Your face, your voice, 5 videos a week — published automatically.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/hook-generator" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Hook Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/ai-video-tools" className="text-gray-400 hover:text-white text-sm transition-colors">
                  AI Video Rankings
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Book a Call
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Assurgit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
