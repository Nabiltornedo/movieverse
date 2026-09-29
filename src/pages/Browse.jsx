import { useCallback, useEffect, useState } from 'react'
import {
  discoverMovies,
  getTrending,
  searchMovies,
  TmdbError,
} from '../api/tmdb'
import { useDebounce } from '../hooks/useDebounce'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { Hero } from '../components/Hero'
import { SearchBar } from '../components/SearchBar'
import { Filters } from '../components/Filters'
import { MovieGrid } from '../components/MovieGrid'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'

export function Browse() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)
  const isSearching = debouncedQuery.trim().length > 0

  const [year, setYear] = useState('')
  const [sortBy, setSortBy] = useState('popularity.desc')

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  const [featured, setFeatured] = useState(null)

  // Reset to page 1 whenever the query, year, or sort changes.
  useEffect(() => {
    setPage(1)
  }, [debouncedQuery, year, sortBy])

  const loadPage = useCallback(
    async (pageToLoad) => {
      pageToLoad === 1 ? setLoading(true) : setLoadingMore(true)
      setError(null)
      try {
        const data = isSearching
          ? await searchMovies({ query: debouncedQuery, page: pageToLoad })
          : await discoverMovies({ page: pageToLoad, year, sortBy })

        setMovies((current) =>
          pageToLoad === 1 ? data.results : [...current, ...data.results]
        )
        setTotalPages(data.total_pages ?? 1)
      } catch (err) {
        setError(
          err instanceof TmdbError
            ? err.message
            : 'Impossible de charger les films pour le moment.'
        )
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [isSearching, debouncedQuery, year, sortBy]
  )

  useEffect(() => {
    loadPage(1)
  }, [loadPage])

  // Load the trending hero movie once, independent of search/filters.
  useEffect(() => {
    getTrending()
      .then((data) => setFeatured(data.results?.[0] ?? null))
      .catch(() => setFeatured(null))
  }, [])

  const canLoadMore = page < totalPages
  const sentinelRef = useInfiniteScroll(
    () => {
      if (!loading && !loadingMore && canLoadMore) {
        const next = page + 1
        setPage(next)
        loadPage(next)
      }
    },
    { enabled: canLoadMore }
  )

  return (
    <div className="container-page py-8">
      {!isSearching && <Hero movie={featured} loading={!featured} />}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl text-light900 dark:text-ink900">
          {isSearching ? `Résultats pour « ${debouncedQuery} »` : 'Tendances de la semaine'}
        </h2>
        <div className="w-full sm:max-w-xs">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      <div className="mt-4">
        <Filters
          year={year}
          onYearChange={setYear}
          sortBy={sortBy}
          onSortChange={setSortBy}
          disabled={isSearching}
        />
      </div>

      <div className="mt-8">
        {error && movies.length === 0 ? (
          <ErrorState message={error} onRetry={() => loadPage(1)} />
        ) : !loading && movies.length === 0 ? (
          <EmptyState
            title="Aucun film trouvé"
            description="Essayez un autre titre ou modifiez vos filtres."
          />
        ) : (
          <MovieGrid movies={movies} loading={loading} />
        )}
      </div>

      {canLoadMore && !error && <div ref={sentinelRef} className="h-10" />}
      {loadingMore && (
        <p className="py-6 text-center text-sm text-light600 dark:text-ink600">
          Chargement de plus de films…
        </p>
      )}
    </div>
  )
}
