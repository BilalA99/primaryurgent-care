import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { GetBlogInfo } from '@/lib/blog/get-blogs'
import { generateBlogPostMeta, generateBlogPostJsonLd, generateFAQJsonLd } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import KeyTakeaways from '@/components/blog/KeyTakeaways'
import FAQAccordion from '@/components/blog/FAQAccordion'
import CdnImageGallery from '@/components/blog/CdnImageGallery'
import BookAnAppointmentPopup from '@/components/BookAnAppointmentPopup'
import CallButton from '@/components/CallButton'

// ISR: revalidate every 24 hours — blog posts rarely change once published
export const revalidate = 86400

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    // Check if we're in a build environment and have the necessary env vars
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('Supabase environment variables not available during static generation')
      return []
    }
    
    const { GetBlogs } = await import('@/lib/blog/get-blogs')
    const posts = await GetBlogs()
    
    // Return empty array if no posts, which is fine for dynamic routes
    if (!posts || posts.length === 0) {
      console.log('No blog posts found for static generation')
      return []
    }
    
    console.log(`Generating static params for ${posts.length} blog posts`)
    return posts.map((post) => ({ slug: post.slug }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Return empty array to allow dynamic rendering
    return []
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const post = await GetBlogInfo(slug)
    
    if (!post) {
      return {
        title: 'Blog Post Not Found | Primary & Urgent Care Centers',
        description: 'The requested blog post could not be found.',
      }
    }
    
    const meta = generateBlogPostMeta(post)
    
    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      alternates: { canonical: meta.canonical },
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: 'article',
        url: meta.canonical,
        images: [{ url: meta.ogImage }],
        siteName: 'Primary & Urgent Care Centers',
        publishedTime: meta.publishedTime,
        modifiedTime: meta.modifiedTime,
        authors: [meta.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.description,
        images: [meta.ogImage],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post | Primary & Urgent Care Centers',
      description: 'Read our latest health insights and urgent care tips.',
    }
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  
  try {
    const post = await GetBlogInfo(slug)

    if (!post) {
      notFound()
    }

    const meta = generateBlogPostMeta(post)
    const jsonLd = generateBlogPostJsonLd(post)

  // Generate JSON-LD scripts
  const BlogPostJsonLd = () => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd)
      }}
    />
  )

  const BreadcrumbJsonLd = () => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://primaryuc.com'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: 'https://primaryuc.com/blog'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: meta.canonical
            }
          ]
        })
      }}
    />
  )

  const FAQJsonLd = () => {
    // Early return if no FAQs
    if (!post.faq || !Array.isArray(post.faq) || post.faq.length === 0) {
      return null
    }

    // Generate FAQ schema
    const faqSchema = generateFAQJsonLd(post)

    // Return null if schema generation failed or returned null
    if (!faqSchema) {
      return null
    }

    // Render FAQ schema script tag
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    )
  }

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <BlogPostJsonLd />
      <BreadcrumbJsonLd />
      <FAQJsonLd />
      
      <article className="max-w-4xl mx-auto px-4 py-12 md:px-6">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#2563eb] hover:text-[#174ea6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#F2F6FC] text-[#2563eb] text-sm font-medium rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date_published}>
                {formatDate(post.date_published)}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.reading_minutes} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <span>By {post.author_name || 'Primary UC Team'}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={post.thumbnail_url || '/doctorwithpatient.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </header>

        {/* Key Takeaways */}
        {post.key_takeaways && Array.isArray(post.key_takeaways) && post.key_takeaways.length > 0 && (
          <KeyTakeaways takeaways={post.key_takeaways} className="mb-8" />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: (post.content_html && post.content_html.trim() !== '') 
                ? post.content_html 
                : post.content_md || '<p>Content not available.</p>' 
            }}
            className="blog-content"
          />
        </div>

        {/* CDN Images Gallery */}
        {post.cdn_images && Array.isArray(post.cdn_images) && post.cdn_images.length > 0 && (
          <CdnImageGallery 
            images={post.cdn_images} 
            postTitle={post.title}
            className="mb-8" 
          />
        )}

        {/* FAQ Section */}
        {post.faq && Array.isArray(post.faq) && post.faq.length > 0 && (
          <FAQAccordion faqs={post.faq} className="mb-8" />
        )}

        {/* CTA Section */}
        <div className="bg-[#D52128] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Same-Day Care?</h2>
          <p className="text-white/90 mb-6">
            Skip the ER wait. Book an appointment or walk in today for expert medical care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointment"
              className="bg-white text-[#D52128] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book an Appointment
            </Link>
            <CallButton 
              label="blog_post_cta" 
              className="bg-transparent text-white font-semibold px-6 py-3 rounded-lg border-2 border-white hover:bg-white hover:text-[#D52128] transition-colors"
            >
              Call 561-223-8024
            </CallButton>
          </div>
        </div>

        {/* Related Services — contextual internal links derived from post tags */}
        {(() => {
          const tags = Array.isArray(post.tags) ? post.tags.map((t: string) => t.toLowerCase()) : [];
          const slugLower = slug.toLowerCase();
          const combined = [...tags, slugLower].join(' ');

          const allServices = [
            { label: 'Car Accident Urgent Care', href: '/car-accident-injury-clinic', keywords: ['accident', 'car', 'auto', 'crash', 'collision', 'pip', 'whiplash'] },
            { label: 'Whiplash Treatment', href: '/car-accident/whiplash', keywords: ['whiplash', 'neck pain', 'cervical'] },
            { label: 'Back & Neck Pain Care', href: '/car-accident/back-neck-pain', keywords: ['back pain', 'neck pain', 'spine', 'lumbar', 'cervical'] },
            { label: 'PIP Documentation', href: '/car-accident/documentation-pip', keywords: ['pip', 'documentation', 'insurance', '14 day'] },
            { label: 'Urgent Injury Care', href: '/urgent-injury-care', keywords: ['injury', 'sprain', 'fracture', 'laceration', 'wound', 'burn'] },
            { label: 'Same-Day MRI & Imaging', href: '/emergency-room', keywords: ['mri', 'ct scan', 'x-ray', 'imaging', 'ultrasound'] },
            { label: 'Pain Management', href: '/pain-management-care', keywords: ['pain', 'chronic pain', 'pain management'] },
            { label: 'Primary Care Doctor', href: '/primary-care-doctor', keywords: ['primary care', 'sick visit', 'physical', 'preventive', 'diabetes', 'hypertension', 'asthma'] },
            { label: 'Medical Records for Attorneys', href: '/lawyers', keywords: ['attorney', 'lawyer', 'legal', 'lawsuit', 'litigation', 'records'] },
          ];

          const matched = allServices.filter(s =>
            s.keywords.some(kw => combined.includes(kw))
          ).slice(0, 3);

          const related = matched.length > 0 ? matched : [
            { label: 'Car Accident Urgent Care', href: '/car-accident-injury-clinic' },
            { label: 'Urgent Injury Care', href: '/urgent-injury-care' },
            { label: 'Book an Appointment', href: '/appointment' },
          ];

          return (
            <div className="mt-12 border-t border-gray-200 pt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Related Services</h2>
              <div className="flex flex-wrap gap-3">
                {related.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="bg-[#F2F6FC] text-[#2563eb] font-medium px-5 py-2.5 rounded-lg hover:bg-[#dbeafe] transition-colors text-sm border border-[#dbeafe]"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </article>
    </main>
  )
  } catch (error) {
    console.error('Error rendering blog post:', error)
    return (
      <main className="w-full bg-[#FAFAFA] min-h-screen">
        <article className="max-w-4xl mx-auto px-4 py-12 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Blog Post</h1>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, there was an error loading this blog post. Please try again later.
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[#2563eb] hover:text-[#174ea6] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </article>
      </main>
    )
  }
}
