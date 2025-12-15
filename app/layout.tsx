import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import BookAppointmentSection from "@/components/BookAppointmentSection";
import { MapProvider } from "@/providers/map-provider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://primaryuc.com'),
  title: "Primary and Urgent Care Centers of Florida",
  description: "Walk-in urgent care, injury, and pain management clinics in Palm Beach County. Hospital-level diagnostics, short wait times, and same-day appointments.",
  keywords: [
    'urgent care Palm Beach County',
    'walk-in clinic Palm Beach',
    'emergency care Palm Beach',
    'injury care Palm Beach',
    'pain management Palm Beach',
    'hospital-level urgent care',
    'same-day appointments',
    'board-certified doctors',
    'advanced imaging',
    'MRI CT X-ray Palm Beach'
  ].join(', '),
  openGraph: {
    title: "Primary and Urgent Care Centers of Florida",
    description: "Walk-in urgent care, injury, and pain management clinics in Palm Beach County. Hospital-level diagnostics, short wait times, and same-day appointments.",
    url: "https://primaryuc.com",
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: "https://primaryuc.com/websitelogo.png",
        width: 512,
        height: 512,
        alt: "Primary & Urgent Care Centers Logo"
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Primary and Urgent Care Centers of Florida",
    description: "Walk-in urgent care, injury, and pain management clinics in Palm Beach County. Hospital-level diagnostics, short wait times, and same-day appointments.",
    images: ['https://primaryuc.com/websitelogo.png'],
    site: '@primaryurgentcare',
  },
  alternates: {
    canonical: "https://primaryuc.com"
  },
  verification: {
    google: 'Idh-hqSzlxK9HgbSvASoNLMQXq70-x_ZhWaqfDFCs6g',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
    <html lang="en" className={interTight.className} suppressHydrationWarning={true}>
      <head>
        {/* Favicon Links - Critical for Google Search Results */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon1.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icon0.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* MedicalClinic Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalClinic',
              name: 'Primary & Urgent Care Centers of Palm Beach County',
              url: 'https://primaryuc.com',
              logo: 'https://primaryuc.com/logo.png',
              image: 'https://primaryuc.com/websitelogo.png',
              description: 'Walk-in urgent care, injury, and pain management clinics in Palm Beach County. Hospital-level diagnostics, short wait times, and same-day appointments.',
              areaServed: [
                {
                  '@type': 'AdministrativeArea',
                  name: 'Royal Palm Beach, FL'
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Lake Worth, FL'
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Palm Springs, FL'
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Lake Worth Beach, FL'
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Palm Beach County, FL'
                }
              ],
              medicalSpecialty: [
                'UrgentCare',
                'PrimaryCare',
                'EmergencyCare',
                'DiagnosticImaging',
                'InjuryCare',
                'PediatricCare',
                'FamilyMedicine'
              ],
              availableService: [
                'Walk-in Urgent Care',
                'Same-day Appointments',
                'Hospital-level Imaging (MRI, CT, X-ray, Ultrasound)',
                'On-site Lab Testing',
                'Board-certified Doctors',
                'Pediatric Care',
                'Primary Care',
                'Physicals & Screenings',
                'Vaccinations',
                'Chronic Disease Management',
                'Women\'s & Men\'s Health',
                'Telemedicine',
                'Insurance & Self-pay Options'
              ],
              openingHours: [
                'Mo-Fr 09:00-18:00',
                'Sa 09:00-16:00'
              ],
              priceRange: '$$',
              telephone: '+1-561-223-8024',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Palm Beach County',
                addressRegion: 'FL',
                addressCountry: 'US'
              },
              sameAs: [
                'https://primaryuc.com/appointment',
                'https://primaryuc.com/locations',
                'https://primaryuc.com/service',
                'https://primaryuc.com/blog'
              ]
            })
          }}
        />
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
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
         
        />
        {/* Hide all iframes globally */}
        <style>{`iframe { display: none !important; visibility: hidden !important; }`}</style>
      </head>

      <body
        className={`${interTight.variable} antialiased overscroll-none`}
        suppressHydrationWarning
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