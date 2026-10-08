import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

function getMetadataBase() {
  const configuredUrl = process.env.SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  try {
    return new URL(configuredUrl);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  applicationName: "Dr Hashim & Associates Dental Clinic",
  title: {
    default: "Dr Hashim & Associates Dental Clinic | Islamabad",
    template: "%s | Dr Hashim & Associates",
  },
  description: "Modern dental care for everyone. Expert care and comfortable visits at Dr Hashim & Associates Dental Clinic in G-9 Markaz, Islamabad.",
  openGraph: {
    siteName: "Dr Hashim & Associates Dental Clinic",
    locale: "en_PK",
    type: "website",
  },
  // The card image itself comes from app/opengraph-image.tsx. Without this the
  // card type defaults to `summary` and the image is shown small or not at all.
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

/**
 * `data-scroll-behavior="smooth"` on <html> is required as of Next.js 16.
 * Next used to override `scroll-behavior` during navigation; it no longer does
 * (see the version-16 upgrade guide). Without the attribute the router's
 * scroll-to-top is animated, so navigating from a long page to a shorter one
 * clamps to the new page's bottom and the viewport strands there. The attribute
 * restores instant scroll on navigation while keeping `scroll-behavior: smooth`
 * for in-page anchors.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* Runs before first paint. Two jobs:
            1. A returning visitor who dismissed the offer banner never sees it
               flash in and then disappear.
            2. `data-enhanced` switches on the scroll-reveal styles. Those hide
               their target until MotionController adds `.is-visible`, so
               without this flag the reveal markup would be permanently
               invisible to anyone without JavaScript — which is most of the
               page. The watchdog covers the other failure: JavaScript is
               enabled but the bundle never executes, so MotionController never
               runs and nothing would ever be revealed. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.dataset.enhanced='1';" +
              "window.__revealWatchdog=setTimeout(function(){delete document.documentElement.dataset.enhanced},4000);" +
              "try{if(localStorage.getItem('dha-offer-banner-dismissed')==='1'){document.documentElement.dataset.offerDismissed='1'}}catch(e){}",
          }}
        />
        {children}
        {/* Privacy-friendly page views: no cookies, no cross-site tracking, so
            the site needs no consent banner. Collects nothing until Web
            Analytics is switched on in the Vercel project dashboard, and is a
            no-op outside Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
