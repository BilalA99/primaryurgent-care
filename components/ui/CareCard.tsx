import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
    <div className={`bg-[#FAFAFA] p-2 h-120 rounded-2xl flex ${horizontal ? 'flex-row' : 'flex-col '} ${className}`}>
        <div className='w-full h-full relative'>
            <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover object-center aspect-square rounded-2xl"
            />
        </div>
        <div className={`flex flex-col ${horizontal ? 'p-8 w-1/2 justify-center ' : 'p-6  justify-between' }`}>
            <div>
                <h3 className="font-bold text-3xl mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-700 text-base mb-4">{description}</p>
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
);

export default CareCard; 