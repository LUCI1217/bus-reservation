import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OmniBus Express | Premium Intercity Bus Reservation",
  description:
    "Book luxury bus tickets with real-time seat selection, dynamic surge transparency, and secure QR-coded boarding passes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <StoreProvider>
          <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
            <AppShell>{children}</AppShell>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
