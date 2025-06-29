import Mappin from '@/components/icons/mappin';
import Phone from '@/components/icons/phone';
import Mappin2 from '../icons/mappin2';
import Link from 'next/link';
interface LocationCardProps {
    location: string;
    phone: string;
    className?: string;
    slug?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, phone, className = '', slug }) => (
    <Link href={`/locations/${slug}`} className={`flex items-center justify-center gap-4 hover:cursor-pointer group${className} `}>
        <div className="border-2 border-[#0445BF] bg-[#0445BF]/10 rounded-xl p-3 px-4 flex items-center justify-center">
            <div className='group-hover:-translate-y-1 transition-transform duration-300'><Mappin2 fill="#0445BF"  /></div>
        </div>
        <div>
            <div className="text-2xl font-[500] text-black">{location}</div>
            <div className="flex items-center gap-2 mt-1">
                <Phone />
                <span className="text-[#DD4D53] text-sm font-medium">{phone}</span>
            </div>
        </div>
    </Link>
);

export default LocationCard; 