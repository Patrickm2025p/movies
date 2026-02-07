# SkyMovie - React Movie App

A modern movie browsing application built with React, Vite, and The Movie Database (TMDB) API.

## Features

- Browse popular, top-rated, and upcoming movies
- Explore TV shows and popular actors
- Search functionality with debouncing
- Movie trailers on hover
- Detailed movie information in modal
- Responsive design for mobile and desktop
- Lazy loading and code splitting for optimal performance

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key (get one at https://www.themoviedb.org/settings/api)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd skymovie
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:
```
VITE_TMDB_API_KEY=your_api_key_here
```

## Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
skymovie/
├── src/
│   ├── composants/         # React components
│   │   ├── ActorsHero/     # Hero section with actors
│   │   ├── ErrorBoundary/  # Error boundary component
│   │   ├── header/         # Navigation header
│   │   ├── MovieCard/      # Movie card with trailer
│   │   ├── MovieModal/     # Movie details modal
│   │   └── MovieRow/       # Horizontal movie row
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Movies.jsx
│   │   ├── TVShows.jsx
│   │   └── People.jsx
│   ├── services/           # API services
│   │   └── tmdb.js         # TMDB API configuration
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env                    # Environment variables (not in git)
├── .env.example            # Example environment file
└── package.json
```

## Technologies Used

- React 19
- Vite 7
- React Router DOM 7
- Axios
- React Icons
- TMDB API

## Performance Optimizations

- Lazy loading of routes
- React.memo for component memoization
- Trailer caching to reduce API calls
- Image lazy loading
- Code splitting with dynamic imports

## Security

- API keys stored in environment variables
- Environment files excluded from git
- Error boundary for graceful error handling

## License

MIT
