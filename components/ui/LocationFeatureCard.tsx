import React from 'react';

interface LocationFeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const LocationFeatureCard: React.FC<LocationFeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-white rounded-[40px] p-10 flex flex-col justify-between h-full shadow-sm">
        <div className="flex items-center mb-8">
            <div className="bg-[#FDF4F4] rounded-full w-20 h-20 flex items-center justify-center">
                {icon}
            </div>
        </div>
        <div>
            <div className="text-4xl font-bold text-black mb-4">{title}</div>
            <div className="text-xl text-[#494647] font-normal leading-snug">{description}</div>
        </div>
    </div>
);

export default LocationFeatureCard; 