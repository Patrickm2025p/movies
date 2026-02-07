import React, { useState, useEffect } from "react";
import MovieRow from "../composants/MovieRow/MovieRow";
import Footer from "../composants/footer/footer";
import "./Trending.css";

function Trending({ onSelectMovie }) {
  const [clickedMovies, setClickedMovies] = useState([]);

  useEffect(() => {
    const clicks = JSON.parse(localStorage.getItem("movieClicks")) || {};
    const sortedMovies = Object.entries(clicks)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([id, data]) => data.movie);
    setClickedMovies(sortedMovies);
  }, []);

  const handleMovieClick = (movie) => {
    const clicks = JSON.parse(localStorage.getItem("movieClicks")) || {};
    clicks[movie.id] = {
      movie: movie,
      count: (clicks[movie.id]?.count || 0) + 1,
      lastClicked: new Date().toISOString()
    };
    localStorage.setItem("movieClicks", JSON.stringify(clicks));
    onSelectMovie(movie);
  };

  return (
    <>
      <div className="trending-page">
        <div className="trending-hero">
          <h1>🔥 Trending Now</h1>
          <p>Discover what everyone is watching</p>
        </div>

        <div className="trending-content">
          {clickedMovies.length > 0 && (
            <MovieRow
              title="Most Clicked by You"
              movies={clickedMovies}
              onSelectMovie={handleMovieClick}
            />
          )}

          <MovieRow
            title="Trending Movies"
            fetchUrl="popular"
            onSelectMovie={handleMovieClick}
          />

          <MovieRow
            title="Top Rated Trending"
            fetchUrl="topRated"
            onSelectMovie={handleMovieClick}
          />

          <MovieRow
            title="Upcoming Trending"
            fetchUrl="upcoming"
            onSelectMovie={handleMovieClick}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Trending;
