const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

class TmdbError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'TmdbError'
    this.status = status
  }
}

async function request(path, params = {}) {
  if (!API_KEY) {
    throw new TmdbError(
      'Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.',
      0
    )
  }

  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'fr-FR')
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const res = await fetch(url.toString())

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new TmdbError(
      body.status_message || `TMDB request failed (${res.status})`,
      res.status
    )
  }

  return res.json()
}

export function getTrending({ page = 1 } = {}) {
  return request('/trending/movie/week', { page })
}

export function searchMovies({ query, page = 1 }) {
  return request('/search/movie', { query, page, include_adult: false })
}

export function discoverMovies({ page = 1, year, sortBy = 'popularity.desc' }) {
  return request('/discover/movie', {
    page,
    primary_release_year: year,
    sort_by: sortBy,
  })
}

export function getMovieDetails(id) {
  return request(`/movie/${id}`)
}

export function getMovieCredits(id) {
  return request(`/movie/${id}/credits`)
}

export function getMovieVideos(id) {
  // Trailers are usually only tagged in English on TMDB, so request
  // both languages and merge, rather than risking an empty fr-FR result.
  return Promise.all([
    request(`/movie/${id}/videos`),
    request(`/movie/${id}/videos`, { language: 'en-US' }),
  ]).then(([fr, en]) => {
    const seen = new Set()
    const merged = [...fr.results, ...en.results].filter((v) => {
      if (seen.has(v.key)) return false
      seen.add(v.key)
      return true
    })
    return { results: merged }
  })
}

export function getMovieRecommendations(id) {
  return request(`/movie/${id}/recommendations`)
}

export function profileUrl(path, size = 'w185') {
  return path ? `${IMAGE_BASE}/${size}${path}` : null
}

export function getGenres() {
  return request('/genre/movie/list')
}

export function posterUrl(path, size = 'w500') {
  return path ? `${IMAGE_BASE}/${size}${path}` : null
}

export function backdropUrl(path, size = 'w1280') {
  return path ? `${IMAGE_BASE}/${size}${path}` : null
}

export { TmdbError }
