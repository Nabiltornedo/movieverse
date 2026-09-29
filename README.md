# MovieVerse — Catalogue Films & Favoris

Application React permettant d'explorer un catalogue de films tendances, de rechercher, filtrer, trier, consulter le détail d'un film et gérer une liste de favoris, à partir de l'API publique [TMDB](https://www.themoviedb.org/).

## Stack

- React 18 + Vite
- React Router
- Tailwind CSS
- lucide-react (icônes)
- API publique TMDB (The Movie Database)

## Installation

```bash
npm install
```

## Configuration de la clé API

1. Créez un compte gratuit sur [themoviedb.org](https://www.themoviedb.org/signup)
2. Récupérez une clé API (v3) ici : [developer.themoviedb.org](https://developer.themoviedb.org/reference/intro/getting-started)
3. Dupliquez le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

4. Renseignez votre clé dans `.env` :

```
VITE_TMDB_API_KEY=votre_cle_api_ici
```

## Lancer le projet

```bash
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview
```

## Fonctionnalités

- **Page d'accueil / Tendances** : hero mettant en avant le film le plus populaire de la semaine, suivi d'une grille de films tendances
- **Recherche** : champ de recherche avec debounce (400ms), affichage d'un message si aucun résultat
- **Filtres & tri** : filtre par année, tri par popularité / note / date de sortie
- **Page détails** : poster, synopsis, genres, durée, note, bouton ajouter/retirer des favoris
- **Favoris** : persistés via `localStorage`, accessibles même après fermeture de l'onglet
- **Pagination** : infinite scroll (chargement automatique de la page suivante en bas de la grille)
- **Dark / Light mode** : bascule manuelle, mémorisée en `localStorage`
- **Skeleton loading** : affiché pendant le chargement initial des films et du hero
- **Responsive** : mobile, tablette, desktop

### Fonctionnalités additionnelles (au-delà du cahier des charges)

- **Casting & réalisateur** : affiché sur la page détails via l'endpoint `/movie/{id}/credits`
- **Bande-annonce** : bouton ouvrant la vidéo YouTube en modale, via `/movie/{id}/videos`
- **Recommandations** : films similaires suggérés en bas de la page détails, via `/movie/{id}/recommendations`
- **Statistiques des favoris** : note moyenne, décennie favorite et film le mieux noté, calculés à partir de la liste de favoris

## Structure du projet

```
src/
  api/tmdb.js              — wrapper autour de l'API TMDB
  components/               — composants réutilisables (MovieCard, SearchBar, Filters, etc.)
  context/FavoritesContext.jsx — état global des favoris (localStorage)
  hooks/                    — useDebounce, useTheme, useInfiniteScroll
  pages/                    — Browse (tendances + recherche + filtres), MovieDetails, Favorites
  App.jsx                   — routing
  main.jsx                  — point d'entrée
```

## Choix techniques

- Les fonctionnalités "Tendances", "Recherche" et "Filtres & tri" sont réunies sur une seule page (`Browse`) plutôt que sur des pages séparées : la recherche remplace dynamiquement la grille de tendances par les résultats, ce qui évite une navigation inutile entre deux vues très proches (comme sur TMDB lui-même).
- La pagination est implémentée en infinite scroll (bonus) plutôt qu'en pagination classique, via un `IntersectionObserver`.
