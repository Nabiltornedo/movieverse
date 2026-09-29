import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Browse } from './pages/Browse'
import { MovieDetails } from './pages/MovieDetails'
import { Favorites } from './pages/Favorites'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/film/:id" element={<MovieDetails />} />
          <Route path="/favoris" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  )
}
