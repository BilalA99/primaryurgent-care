'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileCarouselProps {
  children: React.ReactNode[];
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  className = '',
  showDots = true,
  showArrows = false,
  autoPlay = false,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;

  // Auto-play functionality - DISABLED
  const startAutoPlay = useCallback(() => {
    // Auto-play disabled
  }, []);

  const stopAutoPlay = useCallback(() => {
    // Auto-play disabled
  }, []);

  useEffect(() => {
    // Auto-play disabled
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setTranslateX(0);
  };

  const goToNext = () => {
    if (totalSlides > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      setTranslateX(0);
    }
  };

  const goToPrevious = () => {
    if (totalSlides > 1) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
      setTranslateX(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setTranslateX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentTouchX = e.touches[0].clientX;
    const diff = currentTouchX - startX;
    const maxTranslate = carouselRef.current?.offsetWidth || 0;
    
    // Limit the translate to prevent over-scrolling
    const limitedDiff = Math.max(-maxTranslate * 0.3, Math.min(maxTranslate * 0.3, diff));
    setTranslateX(limitedDiff);
    setCurrentX(currentTouchX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || totalSlides <= 1) return;
    
    const diff = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      // Snap back to current position
      setTranslateX(0);
    }
    
    setIsDragging(false);
    setTranslateX(0);
    
    // Auto-play disabled
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setTranslateX(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    const maxTranslate = carouselRef.current?.offsetWidth || 0;
    
    const limitedDiff = Math.max(-maxTranslate * 0.3, Math.min(maxTranslate * 0.3, diff));
    setTranslateX(limitedDiff);
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || totalSlides <= 1) return;
    
    const diff = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      setTranslateX(0);
    }
    
    setIsDragging(false);
    setTranslateX(0);
    
    // Auto-play disabled
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(0);
      
      // Auto-play disabled
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Desktop Grid - Hidden on Mobile */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2 max-w-5xl mx-auto">
          {children}
        </div>
      </div>

      {/* Mobile Carousel - Visible on Mobile */}
      <div className="md:hidden">
        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / totalSlides)}% + ${translateX}px))`,
              width: `${totalSlides * 100}%`
            }}
          >
            {children.map((child, index) => (
              <div 
                key={index}
                className="flex-shrink-0 flex justify-center px-4"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <div className="w-full max-w-sm">
                  {child}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        {showDots && totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full transition-colors duration-200"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : undefined}
              >
                <span
                  className={`block transition-all duration-200 ${
                    index === currentIndex
                      ? 'w-6 h-2 bg-[#D52128] rounded-full'
                      : 'w-2 h-2 bg-gray-300 rounded-full'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {showArrows && totalSlides > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileCarousel;
