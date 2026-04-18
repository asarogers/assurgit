import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import CookieBanner from "@/components/CookieBanner";
import ThemeProvider from "@/components/ThemeProvider";
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
    default: "Assurgit — Done-For-You AI Video Content Service",
  },
  description:
    "Assurgit is a done-for-you AI video content service. Your AI avatar and voice clone produce 5 research-backed videos every week, auto-published to Instagram, TikTok, LinkedIn, and YouTube. Starting at $397/month. No filming. No contracts.",
  metadataBase: new URL("https://assurgit.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Assurgit",
    images: [
      {
        url: "https://assurgit.com/app-icon-1024.png",
        width: 1024,
        height: 1024,
        alt: "Assurgit — Done-For-You AI Video Content Service",
      },
    ],
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
  "@id": "https://assurgit.com/#organization",
  "name": "Assurgit",
  "url": "https://assurgit.com",
  "logo": "https://assurgit.com/app-icon-1024.png",
  "image": "https://assurgit.com/opengraph-image.png",
  "description": "AI-powered video content system for businesses. Assurgit creates 5 branded videos per week using your personal avatar and voice clone, researched, scripted, and published to Instagram, TikTok, LinkedIn, and YouTube on autopilot.",
  "foundingDate": "2024",
  "sameAs": [
    "https://www.linkedin.com/company/assurgit",
    "https://twitter.com/assurgit",
    "https://www.youtube.com/@assurgit"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "hello@assurgit.com",
    "availableLanguage": "English"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://assurgit.com/#website",
  "url": "https://assurgit.com",
  "name": "Assurgit",
  "description": "AI-powered video content system for businesses.",
  "publisher": { "@id": "https://assurgit.com/#organization" },
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://assurgit.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* hreflang — inline tags so audit tools see them (HTTP Link header covers per-page via middleware) */}
        <link rel="alternate" hrefLang="en-US" href="https://assurgit.com" />
        <link rel="alternate" hrefLang="x-default" href="https://assurgit.com" />
        <meta name="facebook-domain-verification" content="n91pu6uqos8iiyz3gi53aasoc0x2r7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vyiz437qrx");`,
          }}
        />
        {/* Google Analytics 4 */}
        {gaMeasurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  analytics_storage: 'granted',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                });
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                  url_passthrough: true,
                  ads_data_redaction: true,
                });`,
              }}
            />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
        {children}
        <Toaster richColors position="top-right" />
        <AnalyticsProvider />
        <CookieBanner />
        </ThemeProvider>

      </body>
    </html>
  );
}
