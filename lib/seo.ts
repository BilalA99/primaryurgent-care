import { BlogPost, BlogPostMeta } from '@/types/blog'

/** Canonical site URL - use for all SEO signals (canonical, og:url, JSON-LD) */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://primaryuc.com'

export function generateBlogPostMeta(post: BlogPost): BlogPostMeta {
  // Always use SITE_URL for canonical to avoid mixed-domain issues (e.g. primaryurgentcare.com in CMS)
  const canonical = `${SITE_URL.replace(/\/$/, '')}/blog/${post.slug}`
  
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.summary,
    keywords: post.keywords || post.tags || [],
    canonical,
    ogImage: post.og_image_url || post.thumbnail_url || `${SITE_URL}/doctorwithpatient.jpg`,
    publishedTime: post.date_published,
    modifiedTime: post.updated_at,
    readingTime: post.reading_minutes,
    author: post.author_name || 'Primary UC Team'
  }
}

export { SITE_URL }

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
    timeRequired: `PT${meta.readingTime}M`
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

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Build BreadcrumbList schema for structured data
 */
export function buildBreadcrumb(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export interface ServiceSchemaInput {
  name: string;
  description?: string;
  provider: string | { '@id': string };
  areaServed: string | string[] | { '@type': string; name: string }[];
  url: string;
}

/**
 * Maps a plain-text area name to the correct schema.org type.
 * Counties → AdministrativeArea, US states → State, cities → City.
 */
function areaNameToSchemaType(name: string): string {
  if (/county/i.test(name)) return 'AdministrativeArea';
  if (/^(florida|fl)$/i.test(name)) return 'State';
  return 'City';
}

/**
 * Build Service schema for car accident / medical services
 */
export function buildServiceSchema(input: ServiceSchemaInput) {
  const areaServed = Array.isArray(input.areaServed)
    ? input.areaServed.map((a) =>
        typeof a === 'string' ? { '@type': areaNameToSchemaType(a), name: a } : a
      )
    : typeof input.areaServed === 'string'
      ? [{ '@type': areaNameToSchemaType(input.areaServed), name: input.areaServed }]
      : [input.areaServed];

  return {
    '@type': 'Service',
    name: input.name,
    ...(input.description && { description: input.description }),
    url: input.url,
    provider:
      typeof input.provider === 'string'
        ? { '@id': input.provider }
        : input.provider,
    areaServed
  };
}

export interface ClinicSchemaInput {
  name: string;
  url: string;
  address?: Record<string, string>;
  telephone?: string;
  geo?: { lat: number; lng: number };
  openingHours?: string[];
  /** @id of the global clinic network entity this location is a branch of */
  branchOfId?: string;
  /** @id of the parent Organization entity */
  parentOrganizationId?: string;
  [key: string]: unknown;
}

/**
 * Build MedicalClinic schema with @id for entity linking.
 * branchOfId maps to branchOf; parentOrganizationId maps to parentOrganization.
 */
export function buildClinicSchema(input: ClinicSchemaInput & { id?: string }) {
  const { id, branchOfId, parentOrganizationId, ...rest } = input;
  const schema: Record<string, unknown> = {
    '@type': 'MedicalClinic',
    ...rest
  };
  if (id) schema['@id'] = id;
  if (branchOfId) schema['branchOf'] = { '@id': branchOfId };
  if (parentOrganizationId) schema['parentOrganization'] = { '@id': parentOrganizationId };
  return schema;
}

/**
 * Build @graph schema combining multiple entities
 */
export function buildGraphSchema(entities: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': entities
  };
}

/**
 * Strips HTML tags from text, keeping only plain text
 * Used for questions which must be plain text per Google guidelines
 */
function stripHtmlTags(text: string): string {
  if (!text) return ''
  // Remove all HTML tags
  return text.replace(/<[^>]*>/g, '').trim()
}

/**
 * Sanitizes HTML by removing dangerous tags but preserving safe formatting
 * Safe tags: p, strong, em, ul, ol, li, br, span (with class attributes)
 * Dangerous tags: script, iframe, object, embed, etc. are removed
 */
function sanitizeHtml(html: string): string {
  if (!html) return ''
  
  // Remove dangerous script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers like onclick, onload, etc.
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim()
  
  return sanitized
}

/**
 * Validates and filters FAQ items according to Google's requirements
 * - Questions must be non-empty after trimming and stripping HTML
 * - Questions should be under 150 characters (warning if longer)
 * - Answers must be non-empty after trimming and at least 20 characters
 */
function validateAndFilterFAQs(faqs: Array<{ question: string; answer: string }>): Array<{ question: string; answer: string }> {
  if (!faqs || !Array.isArray(faqs)) return []
  
  return faqs
    .map(faq => {
      // Strip HTML from questions (must be plain text)
      const cleanQuestion = stripHtmlTags(faq.question || '')
      // Sanitize but preserve HTML in answers
      const cleanAnswer = sanitizeHtml(faq.answer || '')
      
      return {
        question: cleanQuestion,
        answer: cleanAnswer
      }
    })
    .filter(faq => {
      // Filter out empty questions or answers
      if (!faq.question || faq.question.trim().length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[FAQ Schema] Filtered out FAQ with empty question')
        }
        return false
      }
      
      if (!faq.answer || faq.answer.trim().length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[FAQ Schema] Filtered out FAQ with empty answer')
        }
        return false
      }
      
      // Warn if question is too long (but don't block)
      if (faq.question.length > 150) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[FAQ Schema] Question exceeds 150 characters (${faq.question.length}): ${faq.question.substring(0, 100)}...`)
        }
      }
      
      // Warn if answer is too short (but don't block, just log)
      if (faq.answer.trim().length < 20) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[FAQ Schema] Answer is shorter than recommended 20 characters: ${faq.answer.substring(0, 50)}...`)
        }
      }
      
      return true
    })
}

/**
 * Generates Google-compliant FAQPage schema (JSON-LD) for blog posts
 * Returns null if no valid FAQs are present
 * 
 * @param post - BlogPost with FAQ data
 * @returns FAQPage schema object or null
 */
export function generateFAQJsonLd(post: BlogPost): any | null {
  try {
    // Early return if no FAQs
    if (!post.faq || !Array.isArray(post.faq) || post.faq.length === 0) {
      return null
    }
    
    // Validate and filter FAQs
    const validFAQs = validateAndFilterFAQs(post.faq)
    
    // Return null if no valid FAQs after filtering
    if (validFAQs.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[FAQ Schema] No valid FAQs found after validation')
      }
      return null
    }
    
    // Limit to recommended maximum (10-12 for optimal rich results)
    const limitedFAQs = validFAQs.slice(0, 12)
    if (validFAQs.length > 12 && process.env.NODE_ENV === 'development') {
      console.warn(`[FAQ Schema] Limiting FAQs from ${validFAQs.length} to 12 for optimal rich results`)
    }
    
    // Generate FAQPage schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: limitedFAQs.map(faq => ({
        '@type': 'Question',
        name: faq.question, // Plain text question
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer // Can contain HTML, will be properly escaped by JSON.stringify
        }
      }))
    }
    
    return schema
  } catch (error) {
    // Gracefully handle errors without breaking the page
    if (process.env.NODE_ENV === 'development') {
      console.error('[FAQ Schema] Error generating FAQ schema:', error)
    }
    return null
  }
}