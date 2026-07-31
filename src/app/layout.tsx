import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CookieConsent } from "@/components/cookie-consent";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Every relative URL in metadata (canonicals, OG images) resolves against this
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Digital Marketing & Web Development Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  keywords: [
    "digital marketing agency",
    "web development agency",
    "SEO agency",
    "website design agency",
    "digital marketing agency USA",
    "UK digital marketing agency",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Digital Marketing & Web Development Agency`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Digital Marketing & Web Development Agency`,
    description: site.description,
    creator: "@ovalllc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Marketing",
  // Add your Search Console / Bing tokens here once the domain is verified:
  // verification: { google: "…", other: { "msvalidate.01": "…" } },
};

export const viewport: Viewport = {
  themeColor: "#070c17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        {/* Site-wide entity graph — declared once, referenced by @id elsewhere */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/*
          Loads Google Analytics only after consent. Google's snippet is
          meant to sit in <head>, but next/script's afterInteractive places it
          correctly without blocking hydration, and it must not load at all
          until a visitor has agreed.
        */}
        <CookieConsent />
      </body>
    </html>
  );
}
