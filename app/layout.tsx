import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: "SleepyHorrorWilliam | 小说站",
  description: "原创小说阅读站",
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
        <div className="min-h-screen">{children}</div>

        <footer className="border-t border-[#e4e4e4] bg-[#f7f7f7]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-[#666] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>© 2026 SleepyHorrorWilliam. All Rights Reserved.</p>
            <nav className="flex items-center gap-4">
              <Link href="/copyright" className="hover:text-[#bf2c24]">
                版权声明
              </Link>
              <Link href="/fanworks-policy" className="hover:text-[#bf2c24]">
                同人二创政策
              </Link>
            </nav>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
