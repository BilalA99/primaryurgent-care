import { MapPin, Phone } from 'lucide-react';

interface LocationCardProps {
    location: string;
    phone: string;
    className?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, phone, className = '' }) => (
    <div className={`flex items-center gap-4 ${className}`}>
        <div className="border-2 border-[#0445BF] rounded-xl p-3 flex items-center justify-center">
            <MapPin className="w-7 h-7 text-[#0445BF]" />
        </div>
        <div>
            <div className="text-2xl font-[500] text-black">{location}</div>
            <div className="flex items-center gap-2 mt-1">
                <Phone className="w-5 h-5 text-[#DD4D53]" />
                <span className="text-[#DD4D53] text-sm font-medium">{phone}</span>
            </div>
        </div>
    </div>
);

export default LocationCard; 