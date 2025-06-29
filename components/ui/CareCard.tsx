import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Reveal from '../RevealAnimation';

interface CareCardProps {
    imageSrc: string;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick?: () => void;
    horizontal?: boolean;
    className?: string;
    buttonLink?: string;
}

const CareCard: React.FC<CareCardProps> = ({ imageSrc, title, description, buttonText, onButtonClick, horizontal = false, className = '', buttonLink='#' }) => (
    <Reveal className='w-full overflow-hidden'>
        <div className={`bg-[#FAFAFA] p-6 lg:h-120 rounded-2xl flex space-y-6 ${horizontal ? 'lg:flex-row flex-col' : 'flex-col '} ${className}`}>
            <div className={`w-full h-60 lg:h-full relative p-8 ${title === 'Comprehensive Accident & Pain Care' ? 'lg:order-first md:order-2' : ''}`}>
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-center aspect-square rounded-2xl"
                />
            </div>
            <div className={`flex flex-col ${horizontal ? 'lg:p-8 lg:w-1/2 w-full justify-center ' : ' justify-between' }`}>
                <div className=''>
                    <h3 className="font-bold text-3xl mb-2 text-gray-900">{title}</h3>
                    <p className="text-gray-700 text-sm xl:text-base mb-4">{description}</p>
                </div>
                <Link 
                    href={buttonLink}
                    className="border border-gray-400 text-black rounded-md px-4 py-2 w-fit text-sm font-medium hover:bg-gray-100 transition"
                    onClick={onButtonClick}
                    type="button"
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    </Reveal>
);

export default CareCard; 