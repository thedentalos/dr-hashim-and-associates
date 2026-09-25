import type { Metadata } from "next";
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
  icons: { icon: "/favicon.svg" },
  openGraph: {
    siteName: "Dr Hashim & Associates Dental Clinic",
    locale: "en_PK",
    type: "website",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
