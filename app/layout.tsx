import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import BookAppointmentSection from "@/components/BookAppointmentSection";
import { MapProvider } from "@/providers/map-provider";
import Script from "next/script";

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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TQFNQD3Z');`
          }}
        />
        {/* End Google Tag Manager */}
        {/* Ahrefs Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var ahrefs_analytics_script = document.createElement('script');
              ahrefs_analytics_script.async = true;
              ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
              ahrefs_analytics_script.setAttribute('data-key', 'khUTLsUI7zITAp50h78JNA');
              document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
            `
          }}
        />
        {/* End Ahrefs Analytics */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2BKMKZM043"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2BKMKZM043');
          `,
        }} />
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script src="//translate.google.com/translate_a/element.js?cb=TranslateInit" strategy="afterInteractive" />
        {/* Hide all iframes globally */}
        <style>{`iframe { display: none !important; visibility: hidden !important; }`}</style>
      </head>

      <body
        className={`${interTight.variable} antialiased overscroll-none`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQFNQD3Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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