import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import BookAppointmentSection from "@/components/BookAppointmentSection";

export const metadata: Metadata = {
  title: "Primary and Urgent Care Centers of Florida",
  description: "Primary and Urgent Care Centers of Florida",
  icons: {
    icon: '/websitelogo.png',
    apple: '/websitelogo.png',
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
        className={`${interTight.variable} antialiased`}
      >
        <NavBar />
        <div className="lg:mt-20 mt-30">
          {children}
        </div>
        <BookAppointmentSection />
        <Footer />
      </body>
    </html>
  );
}
