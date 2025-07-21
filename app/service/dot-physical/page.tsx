import React from 'react';
import Polestar from '@/components/icons/polestar';
import Reveal from '@/components/RevealAnimation';
import Head from 'next/head';
import Image from 'next/image';

const dotPhysicalSteps = [
    {
        title: 'Current Physical & Mental Health Review',
        description: 'Your examiner checks vital signs, medications, and overall fitness to confirm you meet FMCSA safety standards.',
    },
    {
        title: 'Detailed Medical History',
        description: 'A quick questionnaire covers past conditions, surgeries, and ongoing treatments to make sure nothing affects safe driving.',
    },
    {
        title: 'Hearing Check',
        description: 'A whisper test or audiometry confirms you can hear sirens, horns, and other critical road sounds at required levels.',
    },
    {
        title: 'Physical Examination',
        description: 'A head-to-toe assessment of heart, lungs, reflexes, and musculoskeletal strength ensures you can handle long hours behind the wheel.',
    },
    {
        title: 'Drug & Alcohol Screening',
        description: 'DOT-compliant urine testing rules out controlled substances or alcohol, keeping you and everyone on the road safer.',
    },
    {
        title: 'Vision Check',
        description: 'Visual-acuity and color-vision tests verify you can read signs, judge distance, and spot hazards—meeting the 20/40 standard with or without corrective lenses.',
    },
];

const faqs = [
    {
        q: 'What is a DOT physical?',
        a: 'A DOT physical is a federally mandated medical exam required for commercial drivers to ensure they meet the health and safety standards set by the FMCSA. It includes a comprehensive review of your physical and mental health, vision, hearing, and drug/alcohol screening.'
    },
    {
        q: 'How long does a DOT physical take?',
        a: 'Most DOT physicals take 30–45 minutes, but we offer flexible scheduling and can accommodate same-day appointments.'
    },
    {
        q: 'What should I bring to my DOT physical?',
        a: 'Bring your driver\'s license, a list of current medications, glasses or hearing aids if you use them, and any relevant medical records.'
    },
    {
        q: 'How much does a DOT physical cost?',
        a: 'Our DOT physicals are $150, including all required testing and documentation. We offer transparent pricing with no hidden fees.'
    },
    {
        q: 'Do you provide same-day results and documentation?',
        a: 'Yes! You\'ll receive your completed DOT forms and medical certificate the same day as your exam.'
    },
    {
        q: 'Are drug and alcohol tests included?',
        a: 'Yes, DOT-compliant urine drug screening is included as part of the exam.'
    },
];

export default function DotPhysicalPage() {
    return (
        <main className="bg-[#FAFAFA] min-h-screen">
            <Head>
                <title>DOT Physical Exam | CDL Medical Exam Palm Beach County</title>
                <meta name="description" content="DOT physical for CDL drivers for $150 at our Palm Beach County urgent care. Federal-certified exams, same-day results. Walk in or book online. Serving Royal Palm Beach, Lake Worth, Palm Springs, and Lantana." />
                <meta name="keywords" content="DOT physical, CDL medical exam, DOT physical near me, urgent care DOT physical, Palm Beach County urgent care, same day DOT physical, FMCSA, commercial driver exam" />
                <link rel="canonical" href="https://primaryuc.com/service/dot-physical" />
            </Head>
            {/* Hero Section */}
            <section className="relative w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-[#D52128]/90 via-[#fff]/60 to-[#FDF4F4]/80 text-center">
                <div className="max-w-6xl mx-auto z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-6 w-full">
                            <span className="inline-flex items-center gap-2 bg-white/80 px-6 py-2 rounded-xl shadow text-[#D52128] font-semibold text-lg"><Polestar /> DOT Physical Exam</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">Federal DOT Physicals for Commercial Drivers</h1>
                        <p className="text-lg md:text-xl text-[#494647] mb-8">Stay compliant and on the road with fast, federally certified DOT physicals. Same-day results, walk-ins welcome, and all documentation provided on the spot.</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start w-full">
                            <a href="/appointment" className="bg-[#D52128] text-white font-semibold px-8 py-4 rounded-xl text-lg shadow hover:bg-[#b81b22] transition">Book DOT Physical</a>
                            <a href="tel:5612238024" className="bg-white text-[#D52128] font-semibold px-8 py-4 rounded-xl text-lg shadow flex items-center gap-3 hover:bg-gray-100 transition border border-[#D52128]">Call (561) 223-8024</a>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center max-w-md relative h-full aspect-square w-full mt-10 md:mt-0">
                        <Image
                            src="/dotphysical.png"
                            alt="DOT Physical Exam - Doctor with Patient"
                            fill
                            className="rounded-2xl shadow-lg object-cover w-full h-auto"
                            priority
                        />
                    </div>
                </div>
                <div className="absolute inset-0 w-full h-full -z-10 bg-[url('/dotphysical.png')] bg-cover bg-center opacity-10" />
            </section>

            {/* Animated Cards Section */}
            <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-3 gap-10">
                {dotPhysicalSteps.map((step, idx) => (
                    <Reveal key={step.title} className="w-full h-full py-5">
                        <div className="bg-white rounded-3xl shadow-lg h-70 p-8 flex flex-col items-center text-center border border-[#F4F3F3] hover:shadow-2xl transition-all duration-300">
                            <div className="mb-4"><Polestar /></div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-base text-[#494647]">{step.description}</p>
                        </div>
                    </Reveal>
                ))}
            </section>

            {/* Informational Section */}
            <section className="max-w-4xl mx-auto py-10 px-4">
                <h2 className="text-4xl font-bold mb-6 text-gray-900">What is a DOT Physical?</h2>
                <p className="text-lg text-[#494647] mb-4">A DOT physical is a federally mandated medical examination required by the Federal Motor Carrier Safety Administration (FMCSA) for individuals operating commercial motor vehicles (CMVs) and maintaining commercial driver's licenses (CDL). Our urgent care centers provide DOT-certified physicals that meet all federal requirements, including thorough medical evaluations, vision and hearing assessments, and drug and alcohol testing. We ensure all examinations comply with current DOT regulations and provide proper documentation for CDL maintenance.</p>
                <h3 className="text-2xl font-semibold mt-8 mb-2 text-gray-900">What's Included?</h3>
                <ul className="list-disc pl-6 text-lg text-[#494647] mb-4">
                    <li>Federal DOT-certified examinations</li>
                    <li>Complete medical evaluation for CDL</li>
                    <li>Drug and alcohol testing available</li>
                    <li>Vision and hearing assessments</li>
                    <li>Same-day results and documentation</li>
                    <li>All forms and paperwork for CDL compliance</li>
                </ul>
                <h3 className="text-2xl font-semibold mt-8 mb-2 text-gray-900">Why Choose Us?</h3>
                <ul className="list-disc pl-6 text-lg text-[#494647] mb-4">
                    <li>Immediate access—walk-ins welcome, flexible scheduling</li>
                    <li>DOT-certified medical examiners</li>
                    <li>Transparent pricing: $150, no hidden fees</li>
                    <li>Convenient locations across Palm Beach County</li>
                    <li>Friendly, bilingual staff</li>
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto py-10 px-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">DOT Physical FAQ</h2>
                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <Reveal key={faq.q} className="w-full py-1">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#F4F3F3]">
                                <h4 className="text-xl font-semibold mb-2 text-[#D52128]">{faq.q}</h4>
                                <p className="text-base text-[#494647]">{faq.a}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </main>
    );
}
