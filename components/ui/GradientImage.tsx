import Image, { ImageProps } from 'next/image';
import React from 'react';

interface GradientImageProps extends Omit<ImageProps, 'src'> {
    src: string;
    className?: string;
    direction?: 'left' | 'right';
}

const GradientImage: React.FC<GradientImageProps> = ({ src, alt, className = '', direction = 'right', ...props }) => (
    <div className={`relative w-full h-full aspect-16/9 py-62 ${className}`} style={{ minHeight: 260 }}>
        <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover', borderRadius: '1.25rem' }}
            className='aspect-square'
            {...props}
        />
        <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
                background:
                direction == 'left' ? 'linear-gradient(198deg, rgba(213, 33, 40, 0.00) 12.07%, rgba(213, 33, 40, 0.06) 58.45%, #D52128 93.07%)' : 'linear-gradient(157deg, rgba(213, 33, 40, 0.00) 17.22%, rgba(213, 33, 40, 0.06) 60.7%, #D52128 93.15%)',
            }}
        />
    </div>
);

export default GradientImage; 