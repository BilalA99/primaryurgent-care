import { supabase } from '@/utils/supabase/server'
import { BlogPost, BlogPostPreview } from '@/types/blog'

export async function GetBlogs(): Promise<BlogPostPreview[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        summary,
        thumbnail_url,
        tags,
        date_published,
        reading_minutes,
        meta_title,
        meta_description
      `)
      .eq('status', 'published')
      .order('date_published', { ascending: false })

    if (error) {
      console.error('Error fetching blogs:', error)
      return []
    }

    return data as BlogPostPreview[]
  } catch (error) {
    console.error('Error in GetBlogs:', error)
    return []
  }
}

export async function GetBlogInfo(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Post not found
      }
      console.error('Error fetching blog info:', error)
      return null
    }

    return data as BlogPost
  } catch (error) {
    console.error('Error in GetBlogInfo:', error)
    return null
  }
}

export async function GetBlogsPaginated(
  page: number = 1,
  perPage: number = 12,
  tag?: string
): Promise<{ posts: BlogPostPreview[]; total: number; totalPages: number }> {
  try {
    const offset = (page - 1) * perPage

    let query = supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        summary,
        thumbnail_url,
        tags,
        date_published,
        reading_minutes,
        meta_title,
        meta_description
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('date_published', { ascending: false })
      .range(offset, offset + perPage - 1)

    if (tag) {
      query = query.contains('tags', [tag])
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching paginated blogs:', error)
      return { posts: [], total: 0, totalPages: 0 }
    }

    const total = count || 0
    const totalPages = Math.ceil(total / perPage)

    return {
      posts: data as BlogPostPreview[],
      total,
      totalPages
    }
  } catch (error) {
    console.error('Error in GetBlogsPaginated:', error)
    return { posts: [], total: 0, totalPages: 0 }
  }
}

export async function GetBlogSearchIndex(limit: number = 50): Promise<{ id: string; slug: string; title: string }[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, title')
      .eq('status', 'published')
      .order('date_published', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching blog search index:', error)
      return []
    }

    return data as { id: string; slug: string; title: string }[]
  } catch (error) {
    console.error('Error in GetBlogSearchIndex:', error)
    return []
  }
}
