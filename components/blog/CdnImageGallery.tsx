'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface CdnImageGalleryProps {
  images: string[]
  postTitle: string
  className?: string
}

const CdnImageGallery: React.FC<CdnImageGalleryProps> = ({ 
  images, 
  postTitle, 
  className = '' 
}) => {
  // Check if URL is from a supported CDN domain for Next.js optimization
  const isOptimizableUrl = (url: string): boolean => {
    const supportedDomains = [
      'hznieioyzvcrfqcvyikc.supabase.co',
      'cdn.primaryuc.com',
      '.b-cdn.net'
    ]
    return supportedDomains.some(domain => url.includes(domain))
  }

  // Generate alt text for images
  const generateAltText = (url: string, index: number): string => {
    return `${postTitle} - Image ${index + 1}`
  }

  // Get image dimensions from URL or use default
  const getImageDimensions = (url: string) => {
    // Default dimensions for CDN images
    return {
      width: 800,
      height: 600
    }
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <section className={`my-12 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Related Images
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((imageUrl, index) => {
            const { width, height } = getImageDimensions(imageUrl)
            const altText = generateAltText(imageUrl, index)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                {isOptimizableUrl(imageUrl) ? (
                  <Image
                    src={imageUrl}
                    alt={altText}
                    width={width}
                    height={height}
                    className="object-cover w-full h-64 md:h-72 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt={altText}
                    className="object-cover w-full h-64 md:h-72 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default CdnImageGallery
