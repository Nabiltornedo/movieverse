export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="skeleton aspect-[2/3] w-full rounded-xl" />
      <div className="skeleton mt-5 h-4 w-4/5 rounded" />
      <div className="skeleton mt-2 h-3 w-1/3 rounded" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="skeleton h-[46vh] min-h-[320px] w-full rounded-2xl sm:h-[52vh]" />
  )
}
