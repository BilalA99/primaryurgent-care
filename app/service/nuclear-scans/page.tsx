import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nuclear Scans Cost | Nuclear Medicine Imaging Palm Beach County',
  description: 'Get nuclear medicine imaging for $550 at our Palm Beach County urgent care. Walk-in for thyroid, bone, and cardiac scans. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
  keywords: [
    'nuclear scans cost',
    'nuclear medicine urgent care',
    'nuclear scans near me',
    'same day nuclear scan',
    'walk-in nuclear medicine',
    'affordable nuclear scans',
    'Palm Beach County urgent care',
    'nuclear medicine scan Palm Beach',
    'nuclear imaging clinic',
    'nuclear medicine Palm Beach County'
  ],
  openGraph: {
    title: 'Nuclear Scans Cost | Nuclear Medicine Imaging Palm Beach County',
    description: 'Get nuclear medicine imaging for $550 at our Palm Beach County urgent care. Walk-in for thyroid, bone, and cardiac scans. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
    url: 'https://primaryuc.com/service/nuclear-scans',
    type: 'website',
    images: [
      {
        url: 'https://primaryuc.com/nuclear2.png',
        width: 1200,
        height: 630,
        alt: 'Nuclear Scans Cost | Nuclear Medicine Imaging Palm Beach County',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuclear Scans Cost | Nuclear Medicine Imaging Palm Beach County',
    description: 'Get nuclear medicine imaging for $550 at our Palm Beach County urgent care. Walk-in for thyroid, bone, and cardiac scans. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
    images: ['https://primaryuc.com/nuclear2.png'],
  },
  alternates: {
    canonical: 'https://primaryuc.com/service/nuclear-scans',
  },
};

export function NuclearScansJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: 'Nuclear Scans',
          description: 'Get nuclear medicine imaging for $550 at our Palm Beach County urgent care. Walk-in for thyroid, bone, and cardiac scans. No appointment needed. Fast, affordable, and expert imaging. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana.',
          url: 'https://primaryuc.com/service/nuclear-scans',
          image: 'https://primaryuc.com/nuclear2.png',
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
          price: '550.00',
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

const NuclearScansPage = () => {
  return (
    <main className="w-full bg-[#FAFAFA] lg:space-y-20 space-y-10 flex flex-col items-center px-4 lg:px-[60px] min-h-screen">
      <NuclearScansJsonLd />
      
      {/* Hero Section */}
      <section className='w-full h-full lg:py-20 py-10'>
        <div className="max-w-8xl mx-auto rounded-2xl bg-[#F2F6FC] grid grid-cols-1 xl:grid-cols-2 gap-0 md:gap-20 p-8 md:p-12 items-center shadow-sm">
          {/* Left: Text */}
          <div className='w-full overflow-hidden'>
            <div className="flex flex-col gap-6 justify-center h-full w-full">
              <p className='text-black text-sm'>Home/<span className="text-[#2563eb] text-sm mb-1 font-[500]"> Services</span>/<span className="text-[#2563eb] text-sm mb-1 font-[500]"> Nuclear Scans</span></p>
              <h1 className="text-4xl md:text-6xl font-[600] text-black mb-2">Nuclear Scans</h1>
              <p className="text-base md:text-xl font-[500] text-[#494647]">
                Advanced functional imaging for thyroid, bone, and cardiac evaluations using radioactive tracers. Get nuclear medicine imaging for $550 at our Palm Beach County urgent care centers.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  <p className="text-lg font-medium">Functional imaging for organ evaluation</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  <p className="text-lg font-medium">Advanced diagnostic for complex conditions</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  <p className="text-lg font-medium">Same-day results for urgent cases</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Image */}
          <div className="flex justify-center relative xl:h-full lg:h-200 h-100 items-center w-full mt-8 md:mt-0">
            <Image
              src="/nuclear2.png"
              alt="Nuclear Scans"
              fill
              className="rounded-2xl object-cover w-full object-center h-full"
            />
          </div>
        </div>
      </section>

      {/* What is Nuclear Scans Section */}
      <section className="max-w-8xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-[600] text-black mb-6">What are Nuclear Scans?</h2>
          <p className="text-lg text-[#494647] leading-relaxed">
            Nuclear medicine represents the cutting edge of functional imaging technology, utilizing small amounts of radioactive materials called tracers to evaluate organ function and detect diseases at the cellular level. Unlike traditional imaging modalities that primarily show anatomical structure, nuclear medicine provides functional information that can reveal disease processes at their earliest stages, often before symptoms develop or structural changes occur.
          </p>
          <p className="text-lg text-[#494647] leading-relaxed mt-4">
            Our nuclear medicine suite features state-of-the-art gamma cameras and PET-CT technology that can detect metabolic changes, blood flow patterns, and cellular activity long before structural changes become apparent on other imaging studies. Nuclear medicine is particularly valuable for evaluating thyroid function, detecting bone metastases, assessing cardiac perfusion, identifying inflammatory processes, and diagnosing a wide range of oncological and neurological conditions.
          </p>
        </div>
      </section>

      {/* Cost Advantage Section */}
      <section className="max-w-8xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-[600] text-black mb-6">Cost Advantage</h2>
          <p className="text-lg text-[#494647] leading-relaxed">
            Nuclear medicine services at our urgent care centers offer significant cost savings compared to hospital-based nuclear medicine services, with typical costs of $550.00 compared to $1,500-3,000 at hospitals. Our transparent pricing includes the examination, interpretation, and detailed results, with no additional facility fees or hidden charges.
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
              <h3 className="text-xl font-semibold text-black mb-2">How much do nuclear scans cost?</h3>
              <p className="text-lg text-[#494647]">Our nuclear scans cost $550, which is significantly less than hospital costs of $1,500-3,000 for the same diagnostic procedures.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Do I need an appointment for nuclear scans?</h3>
              <p className="text-lg text-[#494647]">No appointment is needed. You can walk in anytime during our operating hours for immediate nuclear medicine imaging.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">How long does a nuclear scan take?</h3>
              <p className="text-lg text-[#494647]">The nuclear medicine examination process typically takes 30-60 minutes, depending on the complexity of the study and the areas being evaluated.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">When will I get my results?</h3>
              <p className="text-lg text-[#494647]">Results are typically available within hours, allowing for prompt treatment planning. Our board-certified nuclear medicine specialists provide same-day interpretations for urgent cases.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">What conditions can nuclear scans detect?</h3>
              <p className="text-lg text-[#494647]">Nuclear scans can detect thyroid disorders, bone metastases, cardiac perfusion problems, inflammatory processes, oncological conditions, neurological disorders, and various other medical conditions.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default NuclearScansPage 