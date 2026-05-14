import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emil Shain | Frontend Developer",
  description: "Portfolio of Emil Shain, a Frontend Developer specializing in high-performance web interfaces and interactive experiences.",
};


import SmoothScroll from "@/components/UI/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${manrope.variable} antialiased`}
    >
      <body className="bg-[#050505]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
