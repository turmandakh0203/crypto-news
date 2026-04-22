'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { News } from '@/types/news'

type Props = { news: News }

export default function MainHeroCard({ news }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // MainHeroCard нь үргэлж харагддаг тул rAF x2-оор шууд trigger хийнэ
    // IntersectionObserver mobile-д удаан асинхрон байдаг тул ашиглахгүй
    let r1: number, r2: number
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setInView(true))
    })
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2) }
  }, [])

  const v = inView ? 'in-view' : ''

  return (
    <div ref={ref} className="relative border-b border-[#1c1c1c]">
      <div className="corner-tl z-10" />
      <div className="corner-br z-10" />

      <Link href={`/news/${news.slug}`} className="group block relative overflow-hidden h-[420px] md:h-[620px]">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover opacity-60 group-hover:scale-125 transition-all duration-700 ease-out"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0508] to-[#1a0a0a]" />
        )}
        <div className="absolute inset-0 bg-black/80" />

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 md:px-10 md:pb-10 z-10">

          {/* Label */}
          <div className="reveal-wrap mb-4">
            <div className={`reveal-up anim-delay-1 flex items-center gap-3 ${v}`}>
              <div className={`h-[1.5px] w-6 bg-[#e63329] anim-slide-r anim-delay-1 ${v}`} />
              <span className="text-[12px] uppercase text-[#e63329] font-ttNormsPro">
                Сүүлийн мэдээ — {news.tags?.[0] || news.category}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4 reveal-wrap">
            <h1
              className={`reveal-up font-ttNormsPro font-bold text-[36px] md:text-[80px] leading-[1.2] tracking-[0.06em] w-full md:w-1/2 text-[#f0ece0] ${v}`}
              style={{
                animationDelay: '0.1s', backgroundImage: 'linear-gradient(90deg, rgb(255,201,134) 0%, rgb(254,39,38) 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
              }}
            >
              {news.title}
            </h1>
          </div>

          {/* Lead */}
          <div className="reveal-wrap mb-6">
            <div className={`reveal-up anim-delay-4 ${v}`}>
              <p className="line-clamp-2 text-[14px] md:text-[16px] text-[#888] leading-[1.75] w-full md:w-1/2 font-light">
                {news.lead}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="reveal-wrap">
            <div className={`reveal-up anim-delay-5 ${v}`}>
              <span className="text-[9px] tracking-[0.18em] uppercase text-[#e63329] rounded-full border border-[rgba(230,51,41,0.4)] px-4 py-2 group-hover:bg-[#e63329] group-hover:text-white transition-all inline-block font-bebas">
                Дэлгэрэнгүй →
              </span>
            </div>
          </div>

        </div>
      </Link>
    </div>
  )
}
