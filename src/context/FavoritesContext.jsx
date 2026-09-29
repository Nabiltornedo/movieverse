import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'movieverse:favorites'

function readStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStoredFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const favoriteIds = useMemo(
    () => new Set(favorites.map((movie) => movie.id)),
    [favorites]
  )

  function isFavorite(id) {
    return favoriteIds.has(id)
  }

  function toggleFavorite(movie) {
    setFavorites((current) => {
      if (current.some((item) => item.id === movie.id)) {
        return current.filter((item) => item.id !== movie.id)
      }
      return [
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        },
        ...current,
      ]
    })
  }

  function removeFavorite(id) {
    setFavorites((current) => current.filter((item) => item.id !== id))
  }

  const value = { favorites, isFavorite, toggleFavorite, removeFavorite }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
