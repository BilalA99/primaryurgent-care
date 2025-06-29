import React from 'react';
import Securitycheck from '../icons/securitycheck';
import Reveal from '../RevealAnimation';
import Link from 'next/link';

interface PricingCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    features: string[];
    price: string;
    priceNote?: string;
    className?: string;
    slug: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ icon, title, subtitle, features, price, priceNote, className = '', slug }) => (
   <Link href={`/pricing/${slug}`} className='w-full'>
        <Reveal className='w-full overflow-hidden hover:scale-105 transition-all duration-300 '>
            <div className={`rounded-[28px] p-2  bg-[linear-gradient(180deg,#D52128_0%,#fff_70%)] ${className} h-75`}>
                <div className="bg-white rounded-[24px] p-6 flex flex-col border-[#F4F3F3] border min-w-[300px] h-full">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#D52128] rounded-[12px] p-2 flex items-center justify-center w-14 h-14">
                            {icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-black leading-tight">{title}</div>
                            {subtitle && <div className="text-sm text-[#494647] font-medium">{subtitle}</div>}
                        </div>
                    </div>
                    <hr className="mt-2 border-gray-200" />
                    <ul className="flex flex-col gap-2 my-4">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-y-3 gap-x-2 text-lg w-full text-[#2563eb] font-medium">
                                <Securitycheck />
                                <span className="text-gray-800 font-normal text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className=" border-gray-200" />
                    <div className="mt-auto flex items-end gap-2">
                        <span className="text-[#D52128] text-3xl font-bold">{price}</span>
                        {priceNote && <span className="text-gray-500 text-lg">{priceNote}</span>}
                    </div>
                </div>
            </div>
        </Reveal>
   </Link>
);

export default PricingCard; 