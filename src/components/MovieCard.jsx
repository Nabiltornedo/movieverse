import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { posterUrl } from '../api/tmdb'
import { useFavorites } from '../context/FavoritesContext'
import { RatingBadge } from './RatingBadge'

export function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const poster = posterUrl(movie.poster_path)

  return (
    <div className="group relative animate-riseIn">
      <Link
        to={`/film/${movie.id}`}
        className="block overflow-hidden rounded-xl bg-paper-soft shadow-card transition-transform duration-300 will-change-transform hover:-translate-y-1.5 hover:shadow-glow dark:bg-ink-soft"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-light600/10 dark:bg-ink-raised">
          {poster ? (
            <img
              src={poster}
              alt={movie.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center font-display text-sm text-light600 dark:text-ink600">
              {movie.title}
            </div>
          )}

          <div className="absolute bottom-2 right-2">
            <RatingBadge value={movie.vote_average} size="sm" />
          </div>
        </div>

        <div className="px-3 pb-4 pt-5">
          <h3 className="line-clamp-1 font-display text-base font-medium text-light900 dark:text-ink900">
            {movie.title}
          </h3>
          <p className="mt-1 text-sm text-light600 dark:text-ink600">{year}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(movie)}
        aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        aria-pressed={favorite}
        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-ink900 backdrop-blur transition-colors hover:bg-ink/90"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            favorite ? 'fill-crimson-bright stroke-crimson-bright' : 'stroke-ink900'
          }`}
        />
      </button>
    </div>
  )
}
