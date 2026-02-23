import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { GlobalNav } from "@/components/global-nav";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DriftKit - Framer Motion Spring Physics Components | React UI Library",
  description: "52 beautifully animated React components powered by Framer Motion spring physics. Copy-paste ready components with natural motion for modern web apps. Built for motion designers and developers.",
  keywords: [
    "framer motion",
    "spring physics",
    "react components", 
    "ui library",
    "animation components",
    "motion design",
    "spring animations",
    "framer motion components",
    "react ui kit",
    "animated components"
  ],
  authors: [{ name: "Nikki Kipple", url: "https://nikkikipple.com" }],
  creator: "Nikki Kipple",
  openGraph: {
    title: "DriftKit - Framer Motion Spring Physics Components",
    description: "52 beautifully animated React components powered by spring physics. Copy-paste ready for modern web apps.",
    url: "https://driftkit.com",
    siteName: "DriftKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DriftKit - Framer Motion Spring Physics Components",
    description: "52 beautifully animated React components powered by spring physics. Copy-paste ready for modern web apps.",
    creator: "@nikkikipple",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white`}
        style={{ fontFamily: "'Satoshi', sans-serif", letterSpacing: '0.02em' }}
      >
        <Providers>
          <GlobalNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
