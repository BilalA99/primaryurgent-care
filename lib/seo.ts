import { BlogPost, BlogPostMeta } from '@/types/blog'

export function generateBlogPostMeta(post: BlogPost): BlogPostMeta {
  const baseUrl = 'https://primaryuc.com'
  
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.summary,
    keywords: post.keywords || post.tags || [],
    canonical: post.canonical_url || `${baseUrl}/blog/${post.slug}`,
    ogImage: post.og_image_url || post.thumbnail_url || `${baseUrl}/doctorwithpatient.jpg`,
    publishedTime: post.date_published,
    modifiedTime: post.updated_at,
    readingTime: post.reading_minutes,
    author: post.author_name || 'Primary UC Team'
  }
}

export function generateBlogPostJsonLd(post: BlogPost) {
  const meta = generateBlogPostMeta(post)
  
  // Combine all images: thumbnail, OG image, and CDN images
  const allImages = [
    meta.ogImage,
    ...(post.cdn_images || [])
  ].filter(Boolean) // Remove any undefined values
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    image: allImages,
    datePublished: meta.publishedTime,
    dateModified: meta.modifiedTime,
    author: {
      '@type': 'Organization',
      name: post.author_name || 'Primary UC Team',
      url: 'https://primaryuc.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Primary & Urgent Care Centers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://primaryuc.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': meta.canonical
    },
    url: meta.canonical,
    keywords: meta.keywords.join(', '),
    timeRequired: `PT${meta.readingTime}M`,
    ...(post.faq && post.faq.length > 0 && {
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: post.faq.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    })
  }
}

export function generateBlogIndexJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Health Tips & Urgent Care Insights',
    description: 'Expert health advice, urgent care guidance, and wellness tips from our medical team at Primary & Urgent Care Centers.',
    url: 'https://primaryuc.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Primary & Urgent Care Centers',
      url: 'https://primaryuc.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://primaryuc.com/logo.png'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://primaryuc.com/blog?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

export function generateMetaTitle(title: string, maxLength: number = 60): string {
  return truncateText(title, maxLength)
}

export function generateMetaDescription(description: string, maxLength: number = 160): string {
  return truncateText(description, maxLength)
}

export function toJsonLd(obj: Record<string, any>) {
  return { __html: JSON.stringify(obj) };
}