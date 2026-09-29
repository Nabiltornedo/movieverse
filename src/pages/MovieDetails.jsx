import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Heart } from 'lucide-react'
import {
  backdropUrl,
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
  getMovieVideos,
  posterUrl,
  TmdbError,
} from '../api/tmdb'
import { useFavorites } from '../context/FavoritesContext'
import { RatingBadge } from '../components/RatingBadge'
import { ErrorState } from '../components/ErrorState'
import { CastCrew } from '../components/CastCrew'
import { TrailerButton } from '../components/TrailerButton'
import { Recommendations } from '../components/Recommendations'

function formatRuntime(minutes) {
  if (!minutes) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h${String(m).padStart(2, '0')}`
}

export function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [credits, setCredits] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setMovie(null)
    setCredits(null)
    setTrailerKey(null)
    setRecommendations([])

    getMovieDetails(id)
      .then((data) => {
        if (!cancelled) setMovie(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof TmdbError
              ? err.message
              : "Impossible de charger les détails de ce film."
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    // Secondary data (cast, trailer, recommendations) loads independently
    // and never blocks the main details render if one of these fails.
    getMovieCredits(id)
      .then((data) => {
        if (!cancelled) setCredits(data)
      })
      .catch(() => {})

    getMovieVideos(id)
      .then((data) => {
        if (cancelled) return
        const trailer = data.results?.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        )
        setTrailerKey(trailer?.key ?? null)
      })
      .catch(() => {})

    getMovieRecommendations(id)
      .then((data) => {
        if (!cancelled) setRecommendations(data.results ?? [])
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="container-page py-10">
        <div className="skeleton h-[40vh] w-full rounded-2xl" />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="container-page py-10">
        <ErrorState message={error ?? 'Film introuvable.'} />
      </div>
    )
  }

  const favorite = isFavorite(movie.id)
  const backdrop = backdropUrl(movie.backdrop_path)
  const poster = posterUrl(movie.poster_path)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const runtime = formatRuntime(movie.runtime)
  const director = credits?.crew?.find((person) => person.job === 'Director')

  return (
    <div>
      <div className="relative h-[34vh] min-h-[220px] w-full overflow-hidden">
        {backdrop && (
          <img src={backdrop} alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/60 to-paper/10 dark:from-ink dark:via-ink/70 dark:to-ink/20" />
      </div>

      <div className="container-page relative z-10 -mt-24 pb-16 sm:-mt-32">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-light600 hover:text-light900 dark:text-ink600 dark:hover:text-ink900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>

        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="w-40 shrink-0 sm:w-56">
            <div className="overflow-hidden rounded-xl shadow-card">
              {poster ? (
                <img src={poster} alt={movie.title} className="w-full" />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-light600/10 p-4 text-center font-display text-light600 dark:bg-ink-raised dark:text-ink600">
                  {movie.title}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="font-display text-3xl font-semibold text-light900 dark:text-ink900 sm:text-4xl">
                {movie.title}
              </h1>
              <RatingBadge value={movie.vote_average} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-light600 dark:text-ink600">
              <span>{year}</span>
              {runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {runtime}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-light900/15 px-3 py-1 text-xs text-light600 dark:border-ink900/15 dark:text-ink600"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-light900/85 dark:text-ink900/85">
              {movie.overview || 'Aucun synopsis disponible pour ce film.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => toggleFavorite(movie)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  favorite
                    ? 'bg-crimson text-white hover:bg-crimson-bright'
                    : 'bg-gold text-ink hover:bg-gold-bright'
                }`}
              >
                <Heart className={`h-4 w-4 ${favorite ? 'fill-white' : 'fill-ink'}`} />
                {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>

              <TrailerButton trailerKey={trailerKey} />
            </div>
          </div>
        </div>

        <CastCrew cast={credits?.cast} director={director} />
        <Recommendations movies={recommendations} />
      </div>
    </div>
  )
}
