import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoader } from "@/components/shared/global-loader";
import { LoaderProvider } from "@/components/shared/loader-context";
import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Zharnyx Academy | Tamil Nadu's Elite Cybersecurity Residency",
  description: "Join Zharnyx Academy, the premier cybersecurity residency in Tamil Nadu. Master offensive and defensive security operations through live war games in Coimbatore & Chennai. Get day-1-ready for SOC, VAPT, Cloud, and DFIR roles.",
  icons: {
    icon: '/fav/favicon.ico',
    shortcut: '/fav/favicon-32x32.png',
    apple: '/fav/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/fav/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', url: '/fav/android-chrome-192x192.png', sizes: '192x192' },
    ]
  },
  openGraph: {
    title: "Zharnyx Academy — The Cyber-Residency",
    description: "Master Cybersecurity via Live Operations. Building Tamil Nadu's Elite Talent Pipeline.",
    images: ['https://ik.imagekit.io/bkt3emitco/zharnyxincress.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zharnyx Academy — Cyber-EdTech for the Elite",
    images: ['https://ik.imagekit.io/bkt3emitco/zharnyxincress.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`antialiased bg-background text-foreground font-mono`}
      >
        <LoaderProvider>
          <Suspense fallback={null}>
            <GlobalLoader />
          </Suspense>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="bottom-right" expand={false} />
        </LoaderProvider>
      </body>
    </html>
  );
}
