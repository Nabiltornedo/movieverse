import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { backdropUrl } from '../api/tmdb'
import { HeroSkeleton } from './Skeleton'

export function Hero({ movie, loading }) {
  if (loading || !movie) return <HeroSkeleton />

  const backdrop = backdropUrl(movie.backdrop_path)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : ''

  return (
    <Link
      to={`/film/${movie.id}`}
      className="group relative block h-[46vh] min-h-[320px] w-full overflow-hidden rounded-2xl sm:h-[52vh]"
    >
      {backdrop && (
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col justify-end gap-3 p-6 sm:p-10">
        <span className="w-fit rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
          Tendance cette semaine
        </span>
        <h1 className="max-w-xl font-display text-3xl font-semibold text-ink900 sm:text-5xl">
          {movie.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-ink900/80">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {Math.round((movie.vote_average ?? 0) * 10) / 10}
          </span>
          {year && <span>{year}</span>}
        </div>
        <p className="mt-1 line-clamp-2 max-w-lg text-sm text-ink900/70 sm:text-base">
          {movie.overview}
        </p>
      </div>
    </Link>
  )
}
