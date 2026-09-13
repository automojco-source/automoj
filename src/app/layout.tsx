import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-latin",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Vazirmatn carries the Persian glyphs Geist does not have. Self-hosted so the
 * Farsi side of the site renders in the brand face rather than falling back to
 * Tahoma. Kept to four weights to hold the payload down.
 */
const vazirmatn = localFont({
  src: [
    { path: "./fonts/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Vazirmatn-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-fa",
  display: "swap",
});

/**
 * metadataBase turns the relative URLs in openGraph/twitter/canonical into
 * absolute ones. Without it Next falls back to localhost:3000 at build time and
 * every social preview points at a machine nobody else can reach.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://automoj.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  /**
   * `template` appends the brand to every child page's title, so each page sets
   * only its own subject. `default` is used where a page sets no title of its
   * own (and is the homepage's title).
   */
  title: {
    default: "Auto Moj | Accident Repair & Panel Beating, Watford",
    template: "%s | Auto Moj",
  },
  description:
    "Independent bodyshop in Watford. Traditional hand panel beating, paintless dent removal and colour-matched paint for Watford and North West London. Free estimates, and we deal with your insurer.",
  openGraph: {
    type: "website",
    siteName: "Auto Moj Accident Repair",
    locale: "en_GB",
    url: siteUrl,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1376,
        height: 768,
        alt: "Auto Moj bodyshop, Watford",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "128x128", type: "image/png" },
      { url: "/images/site-icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessSchema />
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
