import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const openaiSans = localFont({
  src: [
    { path: "../public/fonts/OpenAISans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/OpenAISans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/OpenAISans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/OpenAISans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Origami | High-Performance iGaming Originals",
  description:
    "Re-packaged high-performance crypto-style originals for the broader online casino market. Sub-15ms load times. Full customization. Zero compromise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${openaiSans.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
