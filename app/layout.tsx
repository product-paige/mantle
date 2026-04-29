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
  metadataBase: new URL("https://heymantle.com"),
  title: {
    default: "Mantle Compass — practical manuals for early-stage founders",
    template: "%s | Mantle Compass",
  },
  description:
    "Mantle Compass — practical manuals for early-stage founders on positioning, real demand, and customer discovery.",
  applicationName: "Mantle Compass",
  openGraph: {
    type: "website",
    siteName: "Mantle Compass",
    title: "Mantle Compass — practical manuals for early-stage founders",
    description:
      "Mantle Compass — practical manuals for early-stage founders on positioning, real demand, and customer discovery.",
    url: "https://heymantle.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantle Compass — practical manuals for early-stage founders",
    description:
      "Mantle Compass — practical manuals for early-stage founders on positioning, real demand, and customer discovery.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
