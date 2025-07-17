import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import BookAppointmentSection from "@/components/BookAppointmentSection";
import { MapProvider } from "@/providers/map-provider";

export const metadata: Metadata = {
  title: "Primary and Urgent Care Centers of Florida",
  description: "Walk-in urgent care, injury, and pain management clinics in Palm Beach County. Hospital-level diagnostics, short wait times, and same-day appointments.",
  openGraph: {
    title: "Primary and Urgent Care Centers of Florida",
    description: "Walk-in urgent care, injury, and pain management clinics in Palm Beach County. Hospital-level diagnostics, short wait times, and same-day appointments.",
    images: [
      {
        url: "/websitelogo.png",
        width: 512,
        height: 512,
        alt: "Primary & Urgent Care Centers Logo"
      }
    ]
  },
  alternates: {
    canonical: "https://primaryuc.com"
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon1.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon1.png', sizes: '32x32', type: 'image/png' },
    ],
    other: [
      { url: '/icon0.svg', type: 'image/svg+xml' },
    ]
  },
};

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: '500'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interTight.className}>
      <body
        className={`${interTight.variable} antialiased overscroll-none`}
      >
        <MapProvider>
          <NavBar />
          <div className="lg:mt-14 mt-30">
            {children}
          </div>
          <BookAppointmentSection />
          <Footer />
        </MapProvider>
      </body>
    </html>
  );
}
