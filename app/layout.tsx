import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { siteData } from "@/data/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Elegant display serif — luxury / investment-firm feel
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteData.domain}`),
  title: {
    default: "OG GROUP | Investment Properties in Cleveland",
    template: "%s | OG GROUP",
  },
  description:
    "Real estate opportunities in Cleveland. We connect sellers with serious investors.",
  keywords: [
    "Cleveland Wholesale Real Estate",
    "Cash Home Buyers Cleveland",
    "Sell My House Fast Cleveland",
    "Cleveland Real Estate Opportunities",
    "Cleveland Investment Properties",
  ],
  openGraph: {
    title: "OG GROUP — Cleveland Investment Properties",
    description:
      "Real estate opportunities in Cleveland. We connect sellers with serious investors.",
    url: `https://${siteData.domain}`,
    type: "website",
    locale: "en_US",
    siteName: "OG GROUP",
  },
  twitter: {
    card: "summary_large_image",
    title: "OG GROUP — Cleveland Investment Properties",
    description:
      "Real estate opportunities in Cleveland. We connect sellers with serious investors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-cream">
        <Navbar />
        <main className="flex-1 pt-20 pb-14 sm:pb-0">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
