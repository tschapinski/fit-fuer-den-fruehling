import type { Metadata } from "next";
import { Rye, Inter } from "next/font/google";
import "./globals.css";

const rye = Rye({
  variable: "--font-rye",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import localFont from "next/font/local";
const goldsmith = localFont({
  src: "../public/fonts/goldsmith.otf",
  variable: "--font-goldsmith",
});

export const metadata: Metadata = {
  title: "Motorrad Check - All In Wiesloch",
  description: "Ist dein Motorrad fit für den Frühling? Mach den Check von Dirk Bechmann.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${rye.variable} ${inter.variable} ${goldsmith.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
