import { useFavorites } from '../context/FavoritesContext'
import { MovieCard } from '../components/MovieCard'
import { EmptyState } from '../components/EmptyState'
import { FavoritesStats } from '../components/FavoritesStats'

export function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl text-light900 dark:text-ink900">
        Mes favoris
      </h1>
      <p className="mt-1 text-sm text-light600 dark:text-ink600">
        {favorites.length} film{favorites.length > 1 ? 's' : ''} enregistré
        {favorites.length > 1 ? 's' : ''}
      </p>

      <div className="mt-8">
        {favorites.length === 0 ? (
          <EmptyState
            title="Pas encore de favoris"
            description="Les films que vous ajoutez à vos favoris apparaîtront ici, même après avoir fermé l'onglet."
          />
        ) : (
          <>
            <FavoritesStats favorites={favorites} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
