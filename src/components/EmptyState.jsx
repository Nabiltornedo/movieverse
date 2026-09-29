export function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
      <svg
        width="56"
        height="56"
        viewBox="0 0 32 32"
        fill="none"
        className="text-light600 dark:text-ink600"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="2.2" fill="currentColor" />
        <circle cx="16" cy="7.2" r="1.8" fill="currentColor" />
        <circle cx="23" cy="11.6" r="1.8" fill="currentColor" />
        <circle cx="23" cy="20.4" r="1.8" fill="currentColor" />
        <circle cx="16" cy="24.8" r="1.8" fill="currentColor" />
        <circle cx="9" cy="20.4" r="1.8" fill="currentColor" />
        <circle cx="9" cy="11.6" r="1.8" fill="currentColor" />
      </svg>
      <div>
        <p className="font-display text-lg text-light900 dark:text-ink900">{title}</p>
        {description && (
          <p className="mt-1 max-w-sm text-sm text-light600 dark:text-ink600">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
