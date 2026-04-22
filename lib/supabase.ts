import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'
import type { News } from '@/types/news'

let _client: ReturnType<typeof createClient> | null = null

function supabaseServer() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global: {
          fetch: (url: RequestInfo | URL, options: RequestInit = {}) =>
            fetch(url, { ...options, cache: 'no-store' }),
        },
      }
    )
  }
  return _client
}

function normalize(item: News): News {
  return {
    ...item,
    tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : (item.tags ?? []),
    published: item.published === true,
  }
}

export async function getAllNews(): Promise<News[]> {
  const { data, error } = await supabaseServer()
    .from('news')
    .select('id, slug, title, lead, image_url, tags, category, created_at, published')
    .eq('published', true)
    .order('id', { ascending: false })

  if (error) { console.error('getAllNews:', error); return [] }
  return (data ?? []).map(normalize)
}

export const getNewsBySlug = cache(async function getNewsBySlug(slug: string): Promise<News | null> {
  const { data, error } = await supabaseServer()
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) { console.error('getNewsBySlug:', error); return null }
  return normalize(data)
})

export async function getRelatedNews(category: string, currentId: number): Promise<News[]> {
  const { data, error } = await supabaseServer()
    .from('news')
    .select('id, title, slug, category, image_url, lead, tags, content, published')
    .eq('category', category)
    .eq('published', true)
    .neq('id', currentId)
    .limit(2)

  if (error) { console.error('getRelatedNews:', error); return [] }
  return (data ?? []).map(normalize)
}

export async function getViewCount(newsId: number): Promise<number> {
  const { count, error } = await supabaseServer()
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .eq('page', String(newsId)) as any
  if (error) { console.error('getViewCount:', error); return 0 }
  return count ?? 0
}

export async function trackView(newsId: number): Promise<void> {
  const { error } = await supabaseServer()
    .from('page_views')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert([{ page: String(newsId), viewed_at: new Date().toISOString() }] as any)
  if (error) console.error('trackView:', error)
}


export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
