import type { Metadata } from "next";
import "./globals.css";

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
      className="antialiased"
    >
      <body className="bg-[#050505]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
