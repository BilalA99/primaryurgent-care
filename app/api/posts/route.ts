import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Ensure author_name is set and updated_at is current
    const postData = {
      ...body,
      author_name: body.author_name || 'Primary UC Team',
      updated_at: new Date().toISOString() // Explicitly set updated_at
    }

    const { data, error } = await supabase
      .from('posts')
      .upsert(postData, { onConflict: 'slug' })
      .select()
      .single()

    if (error) throw error
    
    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    console.error('Error saving post:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

