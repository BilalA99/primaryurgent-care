export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  content_html: string
  content_md?: string // Temporary backward compatibility
  thumbnail_url: string
  og_image_url: string
  cdn_images?: string[]
  tags: string[]
  status: 'draft' | 'published'
  author_name?: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  keywords: string[]
  date_published: string
  key_takeaways: string[]
  canonical_url: string
  faq: FAQItem[]
  reading_minutes: number
  created_at: string
  updated_at: string
}

export interface BlogPostPreview {
  id: string
  title: string
  slug: string
  summary: string
  thumbnail_url: string
  tags: string[]
  date_published: string
  reading_minutes: number
  meta_title?: string
  meta_description?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BlogPostMeta {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogImage: string
  publishedTime: string
  modifiedTime: string
  readingTime: number
  author: string
}
