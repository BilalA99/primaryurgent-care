'use client';
import { useState } from 'react';
import Image from 'next/image';

const faqs = [
    {
        question: 'Explore Services',
        answer:
            "Urgent care centers are designed to treat those who need attention quickly but don't require an emergency room visit. Urgent care centers do not require appointments and are generally open longer hours than a primary care physician's office. For instance, all Primary Urgent Care Centers are open Monday through Friday fro 9:00am to 6:00pm.",
    },
    {
        question: 'What conditions or injuries can urgent care treat?',
        answer: '',
    },
    {
        question: 'How much does an urgent care visit cost compared with the ER?',
        answer: '',
    },
    {
        question: 'How long will I wait to be seen at urgent care?',
        answer: '',
    },
    {
        question: 'Does urgent care accept my insurance?',
        answer: '',
    },
    {
        question: 'What about insurance?',
        answer: '',
    },
    {
        question: 'What services are offered at urgent care centers?',
        answer: '',
    },
    {
        question: "What's the difference between urgent care and the emergency room(ER)?",
        answer: '',
    },
    {
        question: 'What if I have more questions?',
        answer: '',
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
                <div className="flex flex-col gap-8 col-span-1">
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
                </div>
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