# Crypto-MN · Хэрэглэгч талын мэдээний хуудас

## Файлын бүтэц
```
/types/news.ts                    ← төрлүүд, өнгөний тохиргоо
/lib/supabase.ts                  ← DB functions
/components/news/
  ├── HeroCard.tsx                ← том онцлох мэдээний карт
  ├── GridCard.tsx                ← 3 багананы жижиг карт
  ├── ListItem.tsx                ← жагсаалтын мөр
  └── NewsFilter.tsx              ← ангилал + хайлт (client)
/app/news/
  ├── page.tsx                    ← мэдээний жагсаалт
  └── [slug]/page.tsx             ← дэлгэрэнгүй хуудас
```

## Суулгах
```bash
# 1. Package
npm install @supabase/supabase-js @tailwindcss/typography

# 2. tailwind.config.ts-д нэмэх
plugins: [require('@tailwindcss/typography')]

# 3. .env.local
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 4. tailwind.config.ts-д Bebas Neue нэмэх
fontFamily: {
  bebas: ['Bebas Neue', 'sans-serif'],
}

# 5. layout.tsx-д font нэмэх
import { Bebas_Neue, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
```

## Хэрхэн ажилладаг
1. Admin /admin/news/new → мэдээ бичнэ → Нийтлэх
2. Supabase-д published:true болж хадгалагдана
3. /news хуудас → getAllNews() → Hero + Grid + List харуулна
4. Ангилал дарахад → getNewsByCategory() шүүнэ
5. Хайхад → searchNews() хайна
6. Мэдээ дарахад → /news/[slug] → getNewsBySlug() → дэлгэрэнгүй
