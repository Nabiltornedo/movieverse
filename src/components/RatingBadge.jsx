import { Star } from 'lucide-react'

/**
 * Circular rating badge styled like a ticket stub perforation.
 * `size` controls badge scale for use on cards vs. the details page.
 */
export function RatingBadge({ value, size = 'md' }) {
  const rounded = Math.round((value ?? 0) * 10) / 10
  const isSmall = size === 'sm'

  return (
    <div
      className={`flex items-center justify-center gap-1 rounded-full border-2 border-gold bg-ink/90 font-body font-semibold text-gold shadow-card backdrop-blur
      ${isSmall ? 'h-9 w-9 text-xs' : 'h-14 w-14 text-base'}`}
      aria-label={`Rating ${rounded} out of 10`}
    >
      <Star
        className={isSmall ? 'h-3 w-3 fill-gold' : 'h-4 w-4 fill-gold'}
        strokeWidth={0}
      />
      {rounded || '—'}
    </div>
  )
}
