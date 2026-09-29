import { NavLink } from 'react-router-dom'
import { Film, Heart, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useFavorites } from '../context/FavoritesContext'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { favorites } = useFavorites()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gold text-ink'
        : 'text-light600 hover:text-light900 dark:text-ink600 dark:hover:text-ink900'
    }`

  return (
    <header className="sticky top-0 z-20 border-b border-light900/10 bg-paper/85 backdrop-blur-md dark:border-ink900/10 dark:bg-ink/85">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <Film className="h-5 w-5 text-gold" />
          <span className="font-display text-lg font-semibold italic text-light900 dark:text-ink900">
            MovieVerse
          </span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Films
          </NavLink>
          <NavLink to="/favoris" className={linkClass}>
            <Heart className="h-3.5 w-3.5" />
            Favoris
            {favorites.length > 0 && (
              <span className="rounded-full bg-crimson px-1.5 text-xs text-white">
                {favorites.length}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Changer de thème"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-light600 transition-colors hover:bg-light900/5 dark:text-ink600 dark:hover:bg-ink900/10"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
