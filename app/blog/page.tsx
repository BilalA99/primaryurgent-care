import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import Reveal from '@/components/RevealAnimation';
import BookAnAppointmentPopup from '@/components/BookAnAppointmentPopup';
import CallButton from '@/components/CallButton';
import BlogGrid from '@/components/blog/BlogGrid';
import ErrorBoundary from '@/components/ErrorBoundary';
import { GetBlogs } from '@/lib/blog/get-blogs';
import { generateBlogIndexJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Health Tips & Urgent Care Insights | Primary & Urgent Care Centers',
  description: 'Stay informed with expert health advice, urgent care guidance, and wellness tips from our medical team. From accident care to preventive health, we\'re here to help you make informed decisions about your health.',
  keywords: [
    'health tips',
    'urgent care advice',
    'medical insights',
    'wellness tips',
    'healthcare blog',
    'medical advice',
    'urgent care information',
    'health education',
    'Palm Beach County urgent care',
    'walk-in clinic blog',
    'emergency care tips',
    'injury care advice'
  ].join(', '),
  openGraph: {
    title: 'Health Tips & Urgent Care Insights | Primary & Urgent Care Centers',
    description: 'Stay informed with expert health advice, urgent care guidance, and wellness tips from our medical team.',
    url: 'https://primaryuc.com/blog',
    siteName: 'Primary & Urgent Care Centers',
    images: [
      {
        url: 'https://primaryuc.com/doctorwithpatient.jpg',
        width: 1200,
        height: 630,
        alt: 'Health Tips & Urgent Care Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Tips & Urgent Care Insights | Primary & Urgent Care Centers',
    description: 'Stay informed with expert health advice, urgent care guidance, and wellness tips from our medical team.',
    images: ['https://primaryuc.com/doctorwithpatient.jpg'],
    site: '@primaryurgentcare',
  },
  alternates: {
    canonical: 'https://primaryuc.com/blog',
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
};

// Blog index page with dynamic content
const BlogPage = async () => {
  // Fetch blog posts directly from Supabase
  const posts = await GetBlogs()

  // Generate JSON-LD for blog index
  const BlogIndexJsonLd = () => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateBlogIndexJsonLd())
      }}
    />
  )

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <BlogIndexJsonLd />
      
      {/* Hero Section */}
      <section className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-4 lg:px-[60px]">
        <div className="max-w-8xl mx-auto rounded-2xl bg-[#F2F6FC] grid grid-cols-1 xl:grid-cols-2 gap-0 md:gap-20 p-8 md:p-12 items-center shadow-sm">
          {/* Left: Text and Buttons */}
          <Reveal className="w-full overflow-hidden">
            <div className="flex flex-col justify-center h-full">
              <span className="text-[#2563eb] text-sm mb-6 font-[500]">Blog</span>
              <h1 className="text-4xl md:text-6xl font-[600] text-black mb-8">
                Health Tips & Urgent Care Insights
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-4">
                Stay informed with expert health advice, urgent care guidance, and wellness tips from our medical team. 
                From <Link href="/urgentinjurycare" className="text-[#D52128] hover:underline">accident care</Link> to <Link href="/primary-care-doctor" className="text-[#D52128] hover:underline">preventive health</Link>, we're here to help you make informed decisions about your health.
              </p>
              <p className="text-base md:text-lg text-gray-700 mb-4">
                Our <Link href="/emergencyroom" className="text-[#D52128] hover:underline">hospital-level urgent care</Link> centers provide advanced imaging, 
                <Link href="/paincare" className="text-[#D52128] hover:underline"> pain management</Link>, and comprehensive medical services across Palm Beach County.
              </p>
              <p className="text-base md:text-lg text-gray-700 mb-8">
                Need immediate care? Our <Link href="/locations" className="text-[#D52128] hover:underline">walk-in clinics</Link> are ready to help with same-day appointments and expert medical attention.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <BookAnAppointmentPopup>
                  <button className="bg-[#D52128] text-white font-medium px-5 py-3 rounded-lg flex items-center justify-center text-base hover:bg-[#b81b22] transition gap-2">
                    <Calendar /> Book a Visit
                  </button>
                </BookAnAppointmentPopup>
                <Link href="/locations" className="bg-[#2563eb] text-white font-medium px-5 py-3 rounded-lg flex items-center justify-center text-base hover:bg-[#174ea6] transition gap-2">
                  <MapPin /> Find a Location
                </Link>
              </div>
            </div>
          </Reveal>
          
          {/* Right: Image */}
          <div className="flex justify-center relative items-center w-full xl:h-full mt-8 md:mt-0 lg:h-200 h-100">
            <Image
              src="/doctorwithpatient.jpg"
              alt="Doctor reading medical information"
              fill
              className="rounded-2xl object-cover w-full xl:h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="w-full bg-white py-20 px-4 lg:px-[60px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest Health Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert advice and tips from our medical team to help you stay healthy and informed.
            </p>
          </div>
          
          <ErrorBoundary>
            <BlogGrid posts={posts} />
          </ErrorBoundary>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="w-full bg-[#1B1819] py-20 px-4 lg:px-[60px]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center text-center px-4 pt-8"
            style={{
              background: 'linear-gradient(180deg, #D52128 0%, #1B1819 100%)',
            }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Did You Know?</h2>
            <p className="text-lg text-white max-w-3xl mb-8">
              More than 70% of emergency-room visits could be safely treated at an urgent care center like ours, 
              according to Truven Health Analytics. Skip the ER wait and head to Primary & Urgent Care Centers 
              for rapid relief—from colds, flu, and strep throat to on-site X-rays, labs, immunizations, 
              pediatrics, and occupational health. Same-day appointments, walk-ins welcome.
            </p>
            <CallButton
              label="blog_footer"
              className="inline-flex items-center gap-3 bg-white group text-[#D52128] font-semibold text-lg px-8 py-4 rounded-xl shadow-md mb-8"
            >
              Call Now 561-433-1700
            </CallButton>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;