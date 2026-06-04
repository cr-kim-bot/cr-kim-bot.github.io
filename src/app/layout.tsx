import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import type React from "react";
import { SiteNavbar } from "@/components/nav/NavBar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ThemeProvider } from "@/hooks/use-theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Developer Blog",
    template: "%s | Developer Blog",
  },
  description: "개발하며 배운 것들을 MDX Post로 기록하는 Developer Blog입니다.",
};

const menuItems = [
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full w-full flex flex-col items-center">
        <ThemeProvider>
          <TooltipProvider>
            <SiteNavbar
              className="max-w-[1600px]"
              brand={{ href: "/", label: "D.dev" }}
              menuItems={menuItems}
              trailingSlot={
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              }
            />
            <main className="flex w-full flex-1 max-w-[1600px] px-5 min-w-0 pt-14">
              {children}
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
