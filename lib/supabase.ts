import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'
import type { News, Category } from '@/types/news'

export const CATEGORY_PAGE_SIZE = 8  // 2 hero + 6 grid (desktop), 6 mobile initially
export const LOAD_MORE_SIZE = 6

const CAT_SELECT = 'categories(id, name)'
const CAT_INNER  = 'categories!inner(id, name)'

let _client: ReturnType<typeof createClient> | null = null

function supabaseServer() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global: {
          fetch: (url: RequestInfo | URL, options: RequestInit = {}) =>
            fetch(url, { ...options, next: { revalidate: 60 } }),
        },
      }
    )
  }
  return _client
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(item: any): News {
  return {
    ...item,
    category: item.categories?.name ?? '',
    tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : (item.tags ?? []),
    published: item.published === true,
  }
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabaseServer()
    .from('categories')
    .select('id, slug, name, nav_label, icon, section_label, line1, line2, description, sort_order, is_active')
    .eq('is_active', true)
    .order('sort_order')
  if (error) { console.error('getCategories:', error); return [] }
  return data ?? []
}

export async function getHeroNews(): Promise<News | null> {
  const { data, error } = await supabaseServer()
    .from('news')
    .select(`id, slug, title, lead, image_url, tags, category_id, created_at, published, ${CAT_SELECT}`)
    .eq('published', true)
    .order('id', { ascending: false })
    .limit(1)
    .single()
  if (error || !data) { console.error('getHeroNews:', error); return null }
  return normalize(data)
}

export async function getNewsCategory(
  categoryName: string,
  page: number = 0,
  limit: number = CATEGORY_PAGE_SIZE,
): Promise<{ news: News[]; hasMore: boolean }> {
  const from = page * limit
  const { data, error } = await supabaseServer()
    .from('news')
    .select(`id, slug, title, lead, image_url, tags, category_id, created_at, published, ${CAT_INNER}`)
    .eq('published', true)
    .eq('categories.name', categoryName)
    .order('id', { ascending: false })
    .range(from, from + limit - 1)
  if (error) { console.error('getNewsCategory:', error); return { news: [], hasMore: false } }
  const news = (data ?? []).map(normalize)
  return { news, hasMore: news.length === limit }
}

export async function getAllNews(): Promise<News[]> {
  const { data, error } = await supabaseServer()
    .from('news')
    .select(`id, slug, title, lead, image_url, tags, category_id, created_at, published, ${CAT_SELECT}`)
    .eq('published', true)
    .order('id', { ascending: false })
  if (error) { console.error('getAllNews:', error); return [] }
  return (data ?? []).map(normalize)
}

export const getNewsBySlug = cache(async function getNewsBySlug(slug: string): Promise<News | null> {
  const { data, error } = await supabaseServer()
    .from('news')
    .select(`*, ${CAT_SELECT}`)
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) { console.error('getNewsBySlug:', error); return null }
  return normalize(data)
})

export async function getRelatedNews(categoryId: number, currentId: number): Promise<News[]> {
  const { data, error } = await supabaseServer()
    .from('news')
    .select(`id, title, slug, category_id, image_url, lead, tags, published, ${CAT_SELECT}`)
    .eq('category_id', categoryId)
    .eq('published', true)
    .neq('id', currentId)
    .limit(4)
  if (error) { console.error('getRelatedNews:', error); return [] }
  return (data ?? []).map(normalize)
}

export async function getViewCount(newsId: number): Promise<number> {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: (url: RequestInfo | URL, options: RequestInit = {}) =>
          fetch(url, { ...options, cache: 'no-store' }),
      },
    }
  )
  const { count, error } = await client
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .eq('news_id', newsId)
  if (error) { console.error('getViewCount:', error); return 0 }
  return count ?? 0
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
