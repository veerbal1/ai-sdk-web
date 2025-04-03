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
  title: "Demo - Web Search Agent",
  description: "Generate real-time information with sources using AI",
  keywords: ["AI", "text generation", "real-time information", "sources"],
  authors: [{ name: "Veerbal" }],
  openGraph: {
    title: "Demo - Web Search Agent",
    description: "Generate real-time information with sources using AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo - Web Search Agent",
    description: "Generate real-time information with sources using AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
