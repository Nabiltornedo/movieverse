import { AlertTriangle } from 'lucide-react'

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-crimson/30 bg-crimson/5 px-6 py-16 text-center">
      <AlertTriangle className="h-8 w-8 text-crimson-bright" />
      <div>
        <p className="font-display text-lg text-light900 dark:text-ink900">
          Quelque chose s'est mal passé
        </p>
        <p className="mt-1 text-sm text-light600 dark:text-ink600">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-crimson px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-crimson-bright"
        >
          Réessayer
        </button>
      )}
    </div>
  )
}
