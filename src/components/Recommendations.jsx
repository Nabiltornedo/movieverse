import { MovieCard } from './MovieCard'

export function Recommendations({ movies }) {
  if (!movies || movies.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="font-display text-xl text-light900 dark:text-ink900">
        Vous aimerez peut-être aussi
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:grid-cols-5">
        {movies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
