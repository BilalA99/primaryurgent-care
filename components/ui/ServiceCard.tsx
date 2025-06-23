import Image from 'next/image';

interface ServiceCardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageSrc, title, description }) => {
    return (
        <div className="bg-[#F4F3F3] rounded-lg shadow-md overflow-hidden group">
            <div className="relative h-48">
                <Image
                    src={imageSrc}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 text-base">{description}</p>
            </div>
        </div>
    );
};

export default ServiceCard; 