import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import ProductInquiryFAB from "@/components/ProductInquiryFAB";
import { ProductInquiryProvider } from "@/contexts/ProductInquiryContext";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palcofon Lighting Solutions | High-Quality Lighting for Every Space",
  description:
    "Discover premium lighting solutions for your home and business. Energy-efficient, durable designs for every space by Palcofon.",
  keywords:
    "lighting, LED, energy-efficient, South Africa, Palcofon, B-BBEE Level 1",
  authors: [{ name: "Palcofon" }],
  creator: "Palcofon",
  publisher: "Palcofon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title:
      "Palcofon Lighting Solutions | High-Quality Lighting for Every Space",
    description:
      "Discover premium lighting solutions for your home and business. Energy-efficient, durable designs for every space.",
    url: "https://palcofon.co.za",
    siteName: "Palcofon Lighting",
    images: [
      {
        url: "/Palcofon-Logo.png",
        width: 1200,
        height: 630,
        alt: "Palcofon Lighting Solutions",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palcofon Lighting Solutions",
    description:
      "Discover premium lighting solutions for your home and business.",
    images: ["/Palcofon-Logo.png"],
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
  generator: "v0.dev, absolute amazing system!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Palcofon-Logo.png" />
      </head>
      <body className={inter.className}>
        <ProductInquiryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ProductInquiryFAB />
          <Toaster />
        </ProductInquiryProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L907MZZYCC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L907MZZYCC');
          `}
        </Script>
      </body>
    </html>
  );
}

import "./globals.css";

import "./globals.css";
