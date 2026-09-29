function computeStats(favorites) {
  if (favorites.length === 0) return null

  const avgRating =
    favorites.reduce((sum, m) => sum + (m.vote_average ?? 0), 0) /
    favorites.length

  const decadeCounts = {}
  favorites.forEach((movie) => {
    if (!movie.release_date) return
    const year = parseInt(movie.release_date.slice(0, 4), 10)
    const decade = `${Math.floor(year / 10) * 10}s`
    decadeCounts[decade] = (decadeCounts[decade] ?? 0) + 1
  })
  const topDecade = Object.entries(decadeCounts).sort((a, b) => b[1] - a[1])[0]

  const highestRated = [...favorites].sort(
    (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)
  )[0]

  return { avgRating, topDecade, highestRated }
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl bg-paper-soft px-5 py-4 shadow-card dark:bg-ink-soft">
      <p className="text-xs uppercase tracking-wide text-light600 dark:text-ink600">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl text-light900 dark:text-ink900">
        {value}
      </p>
      {sub && (
        <p className="mt-0.5 line-clamp-1 text-xs text-light600 dark:text-ink600">
          {sub}
        </p>
      )}
    </div>
  )
}

export function FavoritesStats({ favorites }) {
  const stats = computeStats(favorites)
  if (!stats) return null

  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
      <StatCard label="Note moyenne" value={stats.avgRating.toFixed(1)} />
      {stats.topDecade && (
        <StatCard
          label="Décennie favorite"
          value={stats.topDecade[0]}
          sub={`${stats.topDecade[1]} film${stats.topDecade[1] > 1 ? 's' : ''}`}
        />
      )}
      {stats.highestRated && (
        <StatCard
          label="Mieux noté"
          value={stats.highestRated.vote_average?.toFixed(1) ?? '—'}
          sub={stats.highestRated.title}
        />
      )}
    </div>
  )
}
