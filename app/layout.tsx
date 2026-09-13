import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr Hashim and Associates | Thoughtful Dental Care",
  description: "A considered approach to dental care, with your comfort and your smile at the heart of every visit.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
