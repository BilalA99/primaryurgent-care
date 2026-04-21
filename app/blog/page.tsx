import React from 'react';
import CallButton from '@/components/CallButton';
import BlogGrid from '@/components/blog/BlogGrid';
import ErrorBoundary from '@/components/ErrorBoundary';
import { GetBlogs } from '@/lib/blog/get-blogs';
import { generateBlogIndexJsonLd } from '@/lib/seo';

// ISR: revalidate every 5 minutes — balances freshness with TTFB performance
export const revalidate = 300

export const metadata = {
  title: 'Health Tips & Car Accident Care Blog | Primary & Urgent Care',
  description: 'Health tips & urgent care advice from Palm Beach County doctors. PIP, injury treatment, car accident care & more. Expert medical insights.',
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
    title: 'Health Tips & Car Accident Care Blog | Primary & Urgent Care',
    description: 'Health tips & urgent care advice from Palm Beach County doctors. PIP, injury treatment, car accident care & more. Expert medical insights.',
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
    title: 'Health Tips & Car Accident Care Blog | Primary & Urgent Care',
    description: 'Health tips & urgent care advice from Palm Beach County doctors. PIP, injury treatment, car accident care & more. Expert medical insights.',
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
      
      {/* Blog Posts Section */}
      <section className="relative w-full bg-white py-20 px-4 lg:px-[60px] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Medical Cross Pattern */}
          <div className="absolute top-20 left-10 w-16 h-16 opacity-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#2563eb]">
              <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="absolute top-40 right-20 w-12 h-12 opacity-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#D52128]">
              <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="absolute top-60 left-1/4 w-8 h-8 opacity-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#2563eb]">
              <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="absolute top-32 right-12 w-10 h-10 opacity-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#D52128]">
              <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Heartbeat Pattern */}
          <div className="absolute top-32 right-1/3 w-20 h-8 opacity-5">
            <svg viewBox="0 0 100 20" fill="none" className="w-full h-full text-[#D52128]">
              <path d="M5 10L15 2L25 10L35 2L45 10L55 2L65 10L75 2L85 10L95 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-80 left-1/3 w-16 h-6 opacity-5">
            <svg viewBox="0 0 100 20" fill="none" className="w-full h-full text-[#2563eb]">
              <path d="M5 10L15 2L25 10L35 2L45 10L55 2L65 10L75 2L85 10L95 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-16 left-1/2 w-14 h-5 opacity-5">
            <svg viewBox="0 0 100 20" fill="none" className="w-full h-full text-[#2563eb]">
              <path d="M5 10L15 2L25 10L35 2L45 10L55 2L65 10L75 2L85 10L95 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Stethoscope Pattern */}
          <div className="absolute top-24 right-1/4 w-24 h-12 opacity-5">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-full text-[#2563eb]">
              <path d="M20 25C20 25 30 15 40 25C50 35 60 25 60 25M60 25V35M60 35C60 35 70 35 80 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="80" cy="35" r="8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="absolute top-72 left-16 w-20 h-10 opacity-5">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-full text-[#D52128]">
              <path d="M20 25C20 25 30 15 40 25C50 35 60 25 60 25M60 25V35M60 35C60 35 70 35 80 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="80" cy="35" r="8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          {/* Medical Pill Pattern */}
          <div className="absolute top-48 left-8 w-12 h-6 opacity-5">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-full text-[#2563eb]">
              <ellipse cx="50" cy="25" rx="40" ry="20" stroke="currentColor" strokeWidth="2"/>
              <line x1="30" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="absolute top-88 right-8 w-10 h-5 opacity-5">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-full text-[#D52128]">
              <ellipse cx="50" cy="25" rx="40" ry="20" stroke="currentColor" strokeWidth="2"/>
              <line x1="30" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          {/* Bandage Pattern */}
          <div className="absolute top-56 right-1/5 w-16 h-8 opacity-5">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-full text-[#2563eb]">
              <rect x="20" y="15" width="60" height="20" rx="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="40" y1="15" x2="40" y2="35" stroke="currentColor" strokeWidth="2"/>
              <line x1="60" y1="15" x2="60" y2="35" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          {/* Thermometer Pattern */}
          <div className="absolute top-36 left-1/5 w-6 h-16 opacity-5">
            <svg viewBox="0 0 30 80" fill="none" className="w-full h-full text-[#D52128]">
              <rect x="10" y="5" width="10" height="60" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="15" cy="70" r="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="15" x2="15" y2="65" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          
          {/* Syringe Pattern */}
          <div className="absolute top-64 right-16 w-14 h-6 opacity-5">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-full text-[#2563eb]">
              <rect x="10" y="20" width="60" height="10" rx="5" stroke="currentColor" strokeWidth="2"/>
              <rect x="5" y="22" width="8" height="6" rx="3" stroke="currentColor" strokeWidth="2"/>
              <line x1="70" y1="25" x2="85" y2="25" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          {/* Medical Bag Pattern */}
          <div className="absolute top-44 left-1/3 w-18 h-12 opacity-5">
            <svg viewBox="0 0 100 60" fill="none" className="w-full h-full text-[#D52128]">
              <path d="M20 20L20 50C20 55 25 60 30 60L70 60C75 60 80 55 80 50L80 20L70 20L70 10C70 5 65 0 60 0L40 0C35 0 30 5 30 10L30 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="30" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          {/* Subtle Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F2F6FC]/30 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#FDF4F4]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-48 h-32 bg-gradient-to-t from-[#F2F6FC]/20 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-32 h-full bg-gradient-to-r from-[#FDF4F4]/15 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Health Tips & Urgent Care Insights
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert medical advice, urgent care guidance, and wellness tips from our board-certified doctors to help you stay healthy and make informed healthcare decisions.
            </p>
          </div>
          
          <ErrorBoundary>
            <BlogGrid posts={posts} />
          </ErrorBoundary>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="relative w-full py-20 px-4 lg:px-[60px]"
        style={{
          background: 'white',
        }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center justify-center text-center px-4 pt-8 bg-[#D52128] rounded-2xl shadow-lg"
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
              Call Now 561-223-8024
            </CallButton>
          </div>
        </div>
      </section>

    </main>
  );
};

export default BlogPage;