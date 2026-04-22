import LandingLayout from '@/components/news/LandingLayout'

function Bone({ className }: { className?: string }) {
  return <div className={`bg-surface rounded-sm ${className ?? ''}`} />
}

export default function NewsLoading() {
  return (
    <LandingLayout>
      <div className="animate-pulse">

        {/* MainHeroCard skeleton */}
        <div className="relative h-[620px] bg-surface border-b border-border">
          <div className="absolute bottom-10 left-10 right-10 space-y-4">
            <Bone className="h-3 w-36" />
            <Bone className="h-14 w-2/3" />
            <Bone className="h-14 w-1/2" />
            <Bone className="h-4 w-1/2 mt-4" />
            <Bone className="h-8 w-28 mt-2" />
          </div>
        </div>

        {/* HeroCards skeleton — 2 багана */}
        <div className="grid grid-cols-2">
          {[0, 1].map(i => (
            <div key={i} className="relative m-2 rounded-xl overflow-hidden min-h-[480px] bg-surface">
              <div className="absolute bottom-10 left-10 right-10 space-y-3">
                <Bone className="h-2 w-20" />
                <Bone className="h-10 w-4/5" />
                <Bone className="h-10 w-2/3" />
                <Bone className="h-4 w-4/5 mt-2" />
                <Bone className="h-4 w-3/5" />
                <div className="flex justify-between items-center pt-2">
                  <Bone className="h-3 w-20" />
                  <Bone className="h-7 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SectionBanner skeleton */}
        <div className="px-10 py-10 border-b border-border space-y-3">
          <Bone className="h-2 w-32" />
          <Bone className="h-16 w-48" />
          <Bone className="h-16 w-36" />
          <Bone className="h-4 w-2/3 mt-2" />
          <Bone className="h-4 w-1/2" />
        </div>

        {/* GridCards skeleton — 3 багана */}
        <div className="grid grid-cols-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="relative m-2 rounded-xl overflow-hidden min-h-[280px] bg-surface">
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <Bone className="h-2 w-16" />
                <Bone className="h-7 w-4/5" />
                <Bone className="h-7 w-3/5" />
                <Bone className="h-4 w-4/5 mt-1" />
                <Bone className="h-4 w-3/5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </LandingLayout>
  )
}
