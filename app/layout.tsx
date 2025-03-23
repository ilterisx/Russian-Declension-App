import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Russian Declension Reference",
  description:
    "A comprehensive reference for Russian noun, adjective, pronoun, preposition, and number declensions.",
  keywords: [
    "Russian",
    "declension",
    "reference",
    "noun declension",
    "adjective declension",
    "pronoun declension",
    "preposition declension",
    "number declension",
    "Russian Declensions",
    "Study Russian Declensions",
    "Russian Declension Test"
  ],
  icons: {
    icon: "/favicon.ico", 
  },
  openGraph: {
    title: "Russian Declension Reference",
    description:
      "A comprehensive reference for Russian declensions covering various word types.",
    url: "https://russiandeclensions.vercel.app",
    siteName: "Russian Declension Reference",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Russian Declension Reference",
    description:
      "A comprehensive reference for Russian declensions covering various word types.",
  },
  alternates: {
    canonical: "https://russiandeclensions.vercel.app/", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data with JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Russian Declension Reference",
              url: "https://russiandeclensions.vercel.app/", 
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
