import LandingLayout from '@/components/news/LandingLayout'

function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`bg-surface rounded-sm ${className ?? ''}`} style={style} />
}

export default function SlugLoading() {
  return (
    <LandingLayout>
      <div className="animate-pulse min-h-screen bg-bg">

        {/* Hero skeleton */}
        <div className="relative w-full h-[280px] md:h-[430px] bg-surface overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
          <div className="absolute bottom-8 md:bottom-20 left-4 md:left-10 right-4 md:right-10 space-y-3">
            <Bone className="h-2 w-24" />
            <Bone className="h-8 md:h-12 w-3/4" />
            <Bone className="h-8 md:h-12 w-1/2" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="max-w-[840px] mx-auto px-4 md:px-6 -mt-6 md:-mt-14 pt-10 md:pt-20 relative z-10 space-y-4">

          {/* Tags */}
          <div className="flex gap-2 mb-5">
            <Bone className="h-5 w-16" />
            <Bone className="h-5 w-20" />
            <Bone className="h-5 w-14" />
          </div>

          {/* Lead */}
          <div className="border-l-2 border-accent pl-4 space-y-2 mb-8">
            <Bone className="h-5 w-full" />
            <Bone className="h-5 w-5/6" />
            <Bone className="h-5 w-4/6" />
          </div>

          {/* H2 */}
          <Bone className="h-7 w-56 mt-8 mb-4" />

          {/* Body paragraphs */}
          {[1, 1, 0.9, 1, 0.75, 1, 1, 0.8, 1, 0.6].map((w, i) => (
            <Bone key={i} className="h-4" style={{ width: `${w * 100}%` } as React.CSSProperties} />
          ))}

          {/* H2 second */}
          <Bone className="h-7 w-44 mt-8 mb-4" />

          {/* More body */}
          {[1, 0.95, 1, 0.7, 1, 1, 0.85].map((w, i) => (
            <Bone key={i} className="h-4" style={{ width: `${w * 100}%` } as React.CSSProperties} />
          ))}

          {/* Related news skeleton */}
          <div className="mt-10 pt-6 border-t border-border">
            <Bone className="h-2 w-28 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1].map(i => (
                <div key={i} className="border border-border overflow-hidden rounded-xl">
                  <Bone className="h-[140px] w-full rounded-none" />
                  <div className="p-4 bg-surface space-y-2">
                    <Bone className="h-2 w-20" />
                    <Bone className="h-4 w-full" />
                    <Bone className="h-4 w-4/5" />
                    <Bone className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </LandingLayout>
  )
}
