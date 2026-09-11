import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ta-github-io.vercel.app"),
  title: {
    default: "Tornike Avaliani — Engineering undergraduate, Cambridge",
    template: "%s — Tornike Avaliani",
  },
  description:
    "Portfolio of Tornike Avaliani — engineering graduate of the University of Cambridge.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Tornike Avaliani",
    title: "Tornike Avaliani — Engineering, University of Cambridge",
    description:
      "Portfolio of Tornike Avaliani — engineering graduate of the University of Cambridge.",
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Tornike Avaliani — portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tornike Avaliani — Engineering, University of Cambridge",
    description:
      "Portfolio of Tornike Avaliani — engineering graduate of the University of Cambridge.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
