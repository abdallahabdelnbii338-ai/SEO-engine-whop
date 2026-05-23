import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ClerkSetupBanner } from "@/components/shared/clerk-setup-banner";
import { clerkPublishableKey, isClerkConfigured } from "@/lib/clerk-config";
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
  title: "LaunchOS — SEO Engine for SaaS Founders",
  description:
    "AI-powered SEO operating system for SaaS founders, indie hackers, and AI startups. Generate landing page SEO, programmatic pages, blog ideas, and metadata in seconds.",
  keywords: ["SaaS SEO", "startup SEO", "AI SEO tool", "landing page SEO", "programmatic SEO"],
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "256x256", type: "image/png" }],
  },
  openGraph: {
    title: "LaunchOS — SEO Engine for SaaS Founders",
    description: "SEO for founders who hate SEO. Ship content, rank faster.",
    type: "website",
    images: [{ url: "/logo.png", width: 256, height: 256, alt: "LaunchOS" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shell = (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen antialiased bg-zinc-950 text-zinc-50">
        <ClerkSetupBanner />
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181b",
              border: "1px solid #27272a",
              color: "#fafafa",
            },
          }}
        />
      </body>
    </html>
  );

  if (!isClerkConfigured) return shell;

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>{shell}</ClerkProvider>
  );
}
