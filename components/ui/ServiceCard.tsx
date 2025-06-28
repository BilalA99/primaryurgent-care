import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
    imageSrc: string;
    title: string;
    description: string;
    slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageSrc, title, description, slug }) => {
    return (
        <Link href={`/emergencyroom/${slug}`} className="bg-[#F4F3F3] rounded-lg md:h-90 shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="relative h-48">
                <Image
                    src={imageSrc}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className=""
                />
            </div>
            <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 text-base">{description}</p>
            </div>
        </Link>
    );
};

export default ServiceCard; 