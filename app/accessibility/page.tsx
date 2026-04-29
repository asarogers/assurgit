import type { Metadata } from 'next';

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Well Prepped Life',
  description: 'Accessibility Statement for Well Prepped Life — committed to making our website accessible to seniors, disabled adults, and their families.',
  alternates: { canonical: '/accessibility' },
  robots: { index: false, follow: false },
};

export default function AccessibilityPage() {
  return (
    <main className="container-xl section-pad max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-serif)] text-3xl font-bold text-[#2C2C2C] mb-8">
        Accessibility Statement
      </h1>

      <div className="prose prose-neutral max-w-none text-[#3A3A3A] space-y-6">
        <p className="text-sm text-[#5A5A5A]">Last updated: April 2025</p>

        <section>
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2">Our Commitment</h2>
          <p>
            Well Prepped Life is committed to ensuring that our website is accessible to everyone,
            including seniors, disabled adults, and their families. We aim to meet WCAG 2.1 Level AA
            guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2">Measures Taken</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Semantic HTML structure with appropriate heading hierarchy</li>
            <li>Alt text on all meaningful images</li>
            <li>Keyboard-navigable interface</li>
            <li>Sufficient color contrast ratios</li>
            <li>Responsive design that works at all viewport sizes and zoom levels</li>
            <li>ARIA labels on interactive elements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2">Known Limitations</h2>
          <p>
            We are continually working to improve accessibility. If you encounter any barriers,
            please contact us and we will prioritize a fix.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2">Feedback and Contact</h2>
          <p>
            If you experience difficulty accessing any part of our website, please contact us at{' '}
            <a href="mailto:hello@wellpreppedlife.com" className="text-[#6B8F71] underline">
              hello@wellpreppedlife.com
            </a>{' '}
            or call{' '}
            <a href="tel:+14159713464" className="text-[#6B8F71] underline">
              (415) 971-3464
            </a>. We aim to respond within 2 business days.
          </p>
        </section>
      </div>
    </main>
  );
}
