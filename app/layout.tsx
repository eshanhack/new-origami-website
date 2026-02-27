import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const degular = localFont({
  src: "../public/fonts/Degular-Bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-degular",
  display: "swap",
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
        className={`${inter.variable} ${spaceMono.variable} ${degular.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
