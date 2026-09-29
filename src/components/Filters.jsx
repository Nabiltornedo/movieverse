const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularité' },
  { value: 'vote_average.desc', label: 'Note' },
  { value: 'release_date.desc', label: 'Date de sortie' },
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 40 }, (_, i) => currentYear - i)

export function Filters({ year, onYearChange, sortBy, onSortChange, disabled }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={year}
        onChange={(event) => onYearChange(event.target.value)}
        disabled={disabled}
        aria-label="Filtrer par année"
        className="rounded-full border border-light900/10 bg-paper-soft px-4 py-2 text-sm text-light900 disabled:opacity-50 dark:border-ink900/10 dark:bg-ink-soft dark:text-ink900"
      >
        <option value="">Toutes les années</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2 rounded-full border border-light900/10 bg-paper-soft p-1 dark:border-ink900/10 dark:bg-ink-soft">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onSortChange(option.value)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors disabled:opacity-50 ${
              sortBy === option.value
                ? 'bg-gold text-ink'
                : 'text-light600 hover:text-light900 dark:text-ink600 dark:hover:text-ink900'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
