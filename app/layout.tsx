import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Assurgit",
    default: "Assurgit — AI Video Content for Your Business",
  },
  description:
    "Assurgit creates weekly AI-generated videos using your avatar and voice clone, researches your market, writes the scripts, and publishes to Instagram, TikTok, LinkedIn, and YouTube — on autopilot.",
  metadataBase: new URL("https://assurgit.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Assurgit",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Assurgit",
  "url": "https://assurgit.com",
  "description": "AI-powered video content system for businesses. Assurgit creates 5 branded videos per week using your personal avatar and voice clone, researched, scripted, and published to Instagram, TikTok, LinkedIn, and YouTube on autopilot.",
  "sameAs": [
    "https://www.linkedin.com/company/assurgit",
    "https://twitter.com/assurgit",
    "https://www.youtube.com/@assurgit"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "hello@assurgit.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="n91pu6uqos8iiyz3gi53aasoc0x2r7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
        <AnalyticsProvider />

        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vyiz437qrx");
          `}
        </Script>

        {/* Google Analytics 4 */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
