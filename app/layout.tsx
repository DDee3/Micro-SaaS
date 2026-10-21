import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaunchSaaS - Premium Micro-SaaS Starter Kit",
  description:
    "Production-grade Next.js 14 App Router boilerplate with Supabase Auth, PostgreSQL, Stripe Subscriptions, and Shadcn UI.",
  keywords: [
    "Next.js 14",
    "Micro SaaS",
    "Supabase",
    "Stripe Subscriptions",
    "Tailwind CSS",
    "Shadcn UI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        {children}
      </body>
    </html>
  );
}

