import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost } from '@/types/blog'
import { GetBlogInfo } from '@/lib/blog/get-blogs'
import { generateBlogPostMeta, generateBlogPostJsonLd } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import KeyTakeaways from '@/components/blog/KeyTakeaways'
import FAQAccordion from '@/components/blog/FAQAccordion'
import CdnImageGallery from '@/components/blog/CdnImageGallery'
import BookAnAppointmentPopup from '@/components/BookAnAppointmentPopup'
import CallButton from '@/components/CallButton'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const { GetBlogs } = await import('@/lib/blog/get-blogs')
    const posts = await GetBlogs()
    
    return posts.map((post) => ({ slug: post.slug }))
  } catch (error) {
    console.error('Error generating static params:', error)
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

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <BlogPostJsonLd />
      <BreadcrumbJsonLd />
      
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
        {post.key_takeaways && post.key_takeaways.length > 0 && (
          <KeyTakeaways takeaways={post.key_takeaways} className="mb-8" />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">{children}</h3>,
              p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="text-gray-700">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#D52128] pl-4 italic text-gray-600 my-4">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                  {children}
                </pre>
              ),
            }}
          >
            {post.content_md}
          </ReactMarkdown>
        </div>

        {/* CDN Images Gallery */}
        {post.cdn_images && post.cdn_images.length > 0 && (
          <CdnImageGallery 
            images={post.cdn_images} 
            postTitle={post.title}
            className="mb-8" 
          />
        )}

        {/* FAQ Section */}
        {post.faq && post.faq.length > 0 && (
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
              Call 561-433-1700
            </CallButton>
          </div>
        </div>
      </article>
    </main>
  )
}
