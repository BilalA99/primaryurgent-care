import Image from 'next/image';
import { Star } from 'lucide-react';

interface ReviewCardProps {
    stars?: number;
    text: string;
    avatarSrc: string;
    name: string;
    role: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ stars = 5, text, avatarSrc, name, role }) => (
    <div className="flex flex-col gap-6">
        <div className="flex gap-1 mb-2">
            {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} fill="#E67A7E" color="#E67A7E" className="w-7 h-7" />
            ))}
        </div>
        <p className="text-lg text-black mb-6 font-[500]">{text}</p>
        <div className="flex items-center gap-4 mt-auto">
            <Image src={avatarSrc} alt={name} width={56} height={56} className="rounded-full object-cover" />
            <div>
                <div className="font-medium text-lg text-black">{name}</div>
                <div className="text-gray-400 text-base">{role}</div>
            </div>
        </div>
    </div>
);

export default ReviewCard; 