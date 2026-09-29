import { Search, X } from 'lucide-react'

export function SearchBar({ value, onChange, placeholder = 'Rechercher un film…' }) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-light600 dark:text-ink600" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher un film"
        className="w-full rounded-full border border-light900/10 bg-paper-soft py-3 pl-11 pr-11 text-sm text-light900 placeholder:text-light600 focus:border-gold dark:border-ink900/10 dark:bg-ink-soft dark:text-ink900 dark:placeholder:text-ink600"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-light600 hover:bg-light900/5 dark:text-ink600 dark:hover:bg-ink900/10"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
