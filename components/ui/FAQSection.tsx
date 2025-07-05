'use client';
import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../RevealAnimation';

const faqs = [
    {
        question: 'Explore Services',
        answer:
            "Urgent care centers are designed to treat those who need attention quickly but don't require an emergency room visit. Urgent care centers do not require appointments and are generally open longer hours than a primary care physician's office. For instance, all Primary Urgent Care Centers are open Monday through Friday from 9:00am to 6:00pm.",
    },
    {
        question: 'What conditions or injuries can urgent care treat?',
        answer: 'Our urgent care centers treat a comprehensive range of conditions including sprains, strains, fractures, illnesses, allergic reactions, stomach pain, digestive issues, work injuries, UTIs, acute injuries, animal bites, cuts and lacerations, eye and ear injuries, and chronic pain. We provide hospital-level diagnostic imaging with 1.5T MRI, CT scans, digital X-rays, ultrasound, and nuclear medicine. Our board-certified providers can handle most non-life-threatening medical conditions that require prompt attention.',
    },
    {
        question: 'How much does an urgent care visit cost compared with the ER?',
        answer: 'Urgent care visits offer significant cost savings compared to emergency rooms. Our office visits cost $69.99 compared to $500-1,500 for ER evaluations. Additional services include X-rays ($50), ultrasound ($100), MRI ($400), and CT scans ($300-600). Hospital costs for the same services range from $200-400 for X-rays, $400-800 for ultrasound, $1,200-2,500 for MRI, and $800-1,500 for CT scans. We accept most insurance plans with lower copays and deductibles than ER visits.',
    },
    {
        question: 'How long will I wait to be seen at urgent care?',
        answer: 'Our urgent care centers guarantee you\'ll be seen in 15 minutes or less. We use a digital queue system that eliminates long waits typically associated with emergency rooms. You can book a same-day appointment or simply walk in anytime during our hours. Our streamlined process gets you in and out quickly while providing the same diagnostic accuracy as hospitals.',
    },
    {
        question: 'Does urgent care accept my insurance?',
        answer: 'Yes, we accept most major insurance plans including Aetna, BlueCross Blue Shield, Cigna, Florida Medicare, Florida Medicaid, workers\' compensation, and PIP (Personal Injury Protection). We also handle motor vehicle accidents and work-related injuries. Our co-pays are significantly less than hospital emergency room fees, and we work with you to process your insurance claims efficiently.',
    },
    {
        question: 'What services are offered at urgent care centers?',
        answer: 'Our urgent care centers offer comprehensive services including immediate medical care, hospital-level diagnostic imaging (1.5T MRI, CT scans, digital X-rays, ultrasound, nuclear medicine), laboratory testing, wound care, fracture treatment, school physicals, immigration physicals, and medication-assisted treatment. We provide STAT imaging reads within 3 hours and same-day scan results for most studies. All services are available on a walk-in basis or by same-day appointment.',
    },
    {
        question: "What's the difference between urgent care and the emergency room(ER)?",
        answer: 'Urgent care centers provide immediate medical attention for non-life-threatening conditions with significantly shorter wait times (15 minutes or less) and lower costs compared to emergency rooms. We offer the same hospital-level diagnostic equipment and board-certified providers but in a more convenient, efficient setting. Emergency rooms are designed for life-threatening emergencies, while urgent care is ideal for acute conditions that need prompt attention but don\'t require emergency intervention.',
    },
    {
        question: 'What if I have more questions?',
        answer: 'For any questions about our services, insurance, or to schedule an appointment, call us at (561) 231-0250‬. We have four convenient locations across Palm Beach County in Royal Palm Beach, Lake Worth, Palm Springs, and Lantana. Our staff is available to answer questions about services, costs, insurance coverage, and help you determine if urgent care is right for your medical needs.',
    },
];

const FAQSection = () => {
    const [active, setActive] = useState(0);

    return (
        <section className="w-full bg-white py-24 px-4 lg:px-[60px]">
            <h2 className="text-5xl font-bold text-black text-center mb-2">Got Questions? We've Got Answers</h2>
            <p className="text-lg text-gray-500 text-center mb-16">Find quick answers to common questions about urgent care, insurance, cost, wait times, and more.</p>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left: FAQ List */}
                <Reveal className="flex flex-col gap-8 col-span-1">
                    <div className="flex flex-col gap-0 w-full">
                        {faqs.map((faq, i) => (
                            <div key={i} className={i === active ? 'flex flex-col gap-2 mb-4' : 'flex items-center gap-4 py-3 cursor-pointer'} onClick={() => setActive(i)}>
                                <div className="flex items-center gap-4">
                                    <span className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg ${i === active ? 'bg-[#D52128] text-white' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>{String(i + 1).padStart(2, '0')}</span>
                                    <span className={`${i === active ? 'text-[#D52128] text-xl font-bold' : 'text-gray-800 text-lg font-semibold'}`}>{faq.question}</span>
                                </div>
                                {i === active && faq.answer && (
                                    <p className="text-gray-700 text-sm font-medium pl-14 mt-2">{faq.answer}</p>
                                )}
                                {i === active && faq.answer && <hr className="mb-2 mt-2" />}
                            </div>
                        ))}
                    </div>
                </Reveal>
                {/* Right: Image */}
                <div className="flex justify-center items-start w-full lg:h-full h-100 col-span-1">
                    <div className="w-full h-full relative">
                        <Image
                            src="/faq.png"
                            alt="FAQ"
                            fill
                            className="rounded-2xl object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection; 