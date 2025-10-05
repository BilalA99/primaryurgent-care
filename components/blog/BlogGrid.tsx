import React from 'react'
import { BlogPostPreview } from '@/types/blog'
import BlogCard from './BlogCard'

interface BlogGridProps {
  posts: BlogPostPreview[]
  className?: string
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, className = '' }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-[#F2F6FC] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            We're working on bringing you expert health advice, urgent care guidance, and wellness tips from our medical team.
          </p>
          <p className="text-sm text-gray-500">
            Check back soon for valuable insights to help you make informed decisions about your health.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default BlogGrid
