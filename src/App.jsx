import "./services/App.css";
import Header from "./composants/header/header";
import MovieModal from "./composants/MovieModal/MovieModal";
import ErrorBoundary from "./composants/ErrorBoundary/ErrorBoundary";
import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const TVShows = lazy(() => import("./pages/TVShows"));
const People = lazy(() => import("./pages/People"));
const Featured = lazy(() => import("./pages/Featured"));
const Premium = lazy(() => import("./pages/Premium"));
const Trending = lazy(() => import("./pages/Trending"));

const Loading = () => <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading...</div>;

function App() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <ErrorBoundary>
      <Header setSearch={setSearch} />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                onSelectMovie={setSelectedMovie}
              />
            }
          />

          <Route
            path="/movies"
            element={<Movies onSelectMovie={setSelectedMovie} />}
          />

          <Route
            path="/tv"
            element={<TVShows onSelectMovie={setSelectedMovie} />}
          />

          <Route
            path="/people"
            element={<People onSelectMovie={setSelectedMovie} />}
          />

          <Route
            path="/featured"
            element={<Featured onSelectMovie={setSelectedMovie} />}
          />

          <Route
            path="/premium"
            element={<Premium />}
          />

          <Route
            path="/trending"
            element={<Trending onSelectMovie={setSelectedMovie} />}
          />

          <Route path="*" element={<div style={{ color: 'white', textAlign: 'center', padding: '50px' }}><h1>404 - Page Not Found</h1></div>} />
        </Routes>
      </Suspense>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </ErrorBoundary>
  );
}

export default App;