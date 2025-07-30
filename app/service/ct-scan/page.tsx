import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CT Scan Cost | Same-Day CT Imaging Palm Beach County',
  description: 'Get a same-day CT scan for $200 at our Palm Beach County urgent care. Walk-in CT for trauma, chest pain, and emergencies. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
  keywords: [
    'CT scan cost',
    'urgent care CT scan',
    'CT scan near me',
    'same day CT scan',
    'walk-in CT scan',
    'affordable CT scan',
    'Palm Beach County urgent care',
    'CT imaging urgent care',
    'emergency CT scan',
    'CT scan without referral',
    'CT scan Palm Beach County'
  ],
  openGraph: {
    title: 'CT Scan Cost | Same-Day CT Imaging Palm Beach County',
    description: 'Get a same-day CT scan for $200 at our Palm Beach County urgent care. Walk-in CT for trauma, chest pain, and emergencies. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
    url: 'https://primaryuc.com/service/ct-scan',
    type: 'website',
    images: [
      {
        url: 'https://primaryuc.com/ctscan2.png',
        width: 1200,
        height: 630,
        alt: 'CT Scan Cost | Same-Day CT Imaging Palm Beach County',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CT Scan Cost | Same-Day CT Imaging Palm Beach County',
    description: 'Get a same-day CT scan for $200 at our Palm Beach County urgent care. Walk-in CT for trauma, chest pain, and emergencies. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
    images: ['https://primaryuc.com/ctscan2.png'],
  },
  alternates: {
    canonical: 'https://primaryuc.com/service/ct-scan',
  },
};

export function CtScanJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: 'CT Scan',
          description: 'Get a same-day CT scan for $200 at our Palm Beach County urgent care. Walk-in CT for trauma, chest pain, and emergencies. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
          url: 'https://primaryuc.com/service/ct-scan',
          image: 'https://primaryuc.com/ctscan2.png',
          provider: {
            '@type': 'MedicalClinic',
            name: 'Primary & Urgent Care Centers of Palm Beach County',
            url: 'https://primaryuc.com',
          },
          areaServed: [
            'Royal Palm Beach FL',
            'Lake Worth FL',
            'Palm Springs FL',
            'Lantana FL',
            'Palm Beach County FL',
          ],
          price: '200.00',
          priceCurrency: 'USD',
          availableAtOrFrom: {
            '@type': 'MedicalClinic',
            name: 'Primary & Urgent Care Centers of Palm Beach County',
          },
        }),
      }}
    />
  )
}

const CtScanPage = () => {
  return (
    <main className="w-full bg-[#FAFAFA] lg:space-y-20 space-y-10 flex flex-col items-center px-4 lg:px-[60px] min-h-screen">
      <CtScanJsonLd />
      
      {/* Hero Section */}
      <section className='w-full h-full lg:py-20 py-10'>
        <div className="max-w-8xl mx-auto rounded-2xl bg-[#F2F6FC] grid grid-cols-1 xl:grid-cols-2 gap-0 md:gap-20 p-8 md:p-12 items-center shadow-sm">
          {/* Left: Text */}
          <div className='w-full overflow-hidden'>
            <div className="flex flex-col gap-6 justify-center h-full w-full">
              <p className='text-black text-sm'>Home/<span className="text-[#2563eb] text-sm mb-1 font-[500]"> Services</span>/<span className="text-[#2563eb] text-sm mb-1 font-[500]"> CT Scan</span></p>
              <h1 className="text-4xl md:text-6xl font-[600] text-black mb-2">CT Scan</h1>
              <p className="text-base md:text-xl font-[500] text-[#494647]">
                Advanced cross-sectional imaging for trauma, chest pain, and abdominal emergencies with immediate results. Get same-day CT scans for $200 at our Palm Beach County urgent care centers.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  <p className="text-lg font-medium">Fast, low-dose cross-sectional imaging</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  <p className="text-lg font-medium">Ideal for trauma and emergency evaluation</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  <p className="text-lg font-medium">Immediate results for urgent cases</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Image */}
          <div className="flex justify-center relative xl:h-full lg:h-200 h-100 items-center w-full mt-8 md:mt-0">
            <Image
              src="/ctscan2.png"
              alt="CT Scan"
              fill
              className="rounded-2xl object-cover w-full object-center h-full"
            />
          </div>
        </div>
      </section>

      {/* What is CT Scan Section */}
      <section className="max-w-8xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-[600] text-black mb-6">What is a CT Scan?</h2>
          <p className="text-lg text-[#494647] leading-relaxed">
            Computed Tomography (CT) scanning represents a revolutionary advancement in medical imaging technology that combines sophisticated X-ray technology with advanced computer processing to create detailed, cross-sectional images of the body. Unlike traditional X-rays that provide only 2D images, CT scans generate comprehensive 3D views that can reveal the intricate details of bones, blood vessels, soft tissues, and internal organs with exceptional clarity.
          </p>
          <p className="text-lg text-[#494647] leading-relaxed mt-4">
            Our multi-slice CT scanner utilizes cutting-edge technology to capture hundreds of images in a single rotation, providing radiologists with unprecedented detail for accurate diagnosis of complex medical conditions. The technology is particularly valuable for evaluating trauma cases, detecting internal bleeding, identifying tumors, assessing cardiovascular conditions, and diagnosing a wide range of acute and chronic medical problems.
          </p>
        </div>
      </section>

      {/* Cost Advantage Section */}
      <section className="max-w-8xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-[600] text-black mb-6">Cost Advantage</h2>
          <p className="text-lg text-[#494647] leading-relaxed">
            CT scanning services at our urgent care centers offer significant cost savings compared to hospital-based CT services, with typical costs of $200.00 compared to $800-1,500 at hospitals. Our transparent pricing includes the examination, interpretation, and detailed results, with no additional facility fees or hidden charges.
          </p>
          <p className="text-lg text-[#494647] leading-relaxed mt-4">
            We accept most major insurance plans with lower copays and deductibles compared to hospital settings, and we offer affordable self-pay options for patients without insurance. The immediate availability and faster turnaround times mean patients can avoid taking time off work or arranging childcare for extended hospital visits.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-8xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-[600] text-black mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">How much does a CT scan cost?</h3>
              <p className="text-lg text-[#494647]">Our CT scans cost $200, which is significantly less than hospital costs of $800-1,500 for the same diagnostic procedure.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Do I need an appointment for a CT scan?</h3>
              <p className="text-lg text-[#494647]">No appointment is needed. You can walk in anytime during our operating hours for immediate CT imaging.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">How long does a CT scan take?</h3>
              <p className="text-lg text-[#494647]">The CT scanning process typically takes 15-30 minutes, depending on the complexity of the study and the areas being evaluated.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">When will I get my results?</h3>
              <p className="text-lg text-[#494647]">Results are typically available within hours, allowing for prompt treatment planning. Our board-certified radiologists provide same-day interpretations for urgent cases.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CtScanPage 