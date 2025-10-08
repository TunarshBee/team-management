import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import Header from "@/shared/components/layout/Header";
import SecondaryNavigation from "@/shared/components/layout/SecondaryNavigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Bazara - Team Management",
  description: "Team Management System for Bazara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-secondary-background`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <SecondaryNavigation />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
