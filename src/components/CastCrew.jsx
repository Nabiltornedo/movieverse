import { profileUrl } from '../api/tmdb'

function PersonCard({ name, role, imagePath }) {
  const photo = profileUrl(imagePath)

  return (
    <div className="w-24 shrink-0 sm:w-28">
      <div className="aspect-square overflow-hidden rounded-full bg-light600/10 dark:bg-ink-raised">
        {photo ? (
          <img src={photo} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-lg text-light600 dark:text-ink600">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <p className="mt-2 line-clamp-1 text-center text-sm font-medium text-light900 dark:text-ink900">
        {name}
      </p>
      {role && (
        <p className="line-clamp-1 text-center text-xs text-light600 dark:text-ink600">
          {role}
        </p>
      )}
    </div>
  )
}

export function CastCrew({ cast, director }) {
  const topCast = (cast ?? []).slice(0, 8)

  if (!director && topCast.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="font-display text-xl text-light900 dark:text-ink900">
        Casting
      </h2>
      <div className="mt-4 flex gap-5 overflow-x-auto pb-2">
        {director && (
          <PersonCard
            name={director.name}
            role="Réalisateur"
            imagePath={director.profile_path}
          />
        )}
        {topCast.map((person) => (
          <PersonCard
            key={person.id}
            name={person.name}
            role={person.character}
            imagePath={person.profile_path}
          />
        ))}
      </div>
    </div>
  )
}
