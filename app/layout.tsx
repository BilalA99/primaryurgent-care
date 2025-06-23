import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Primary and Urgent Care Centers of Florida",
  description: "Primary and Urgent Care Centers of Florida",
};

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
