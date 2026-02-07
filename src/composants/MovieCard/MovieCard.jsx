import React, { useState, memo } from "react";
import { tmdb } from "../../services/tmdb";
import "./MovieCard.css";

const trailerCache = new Map();

const MovieCard = memo(({ movie, onClick }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchTrailer = async () => {
    if (trailerKey) return;
    if (trailerCache.has(movie.id)) {
      setTrailerKey(trailerCache.get(movie.id));
      return;
    }

    try {
      const res = await tmdb.get(`/movie/${movie.id}/videos`);
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        trailerCache.set(movie.id, trailer.key);
        setTrailerKey(trailer.key);
      }
    } catch (err) {
      console.error("Failed to fetch trailer:", err);
    }
  };

  return (
    <div
      className="movie-card"
      onClick={onClick}
      onMouseEnter={() => {
        fetchTrailer();
        setShowTrailer(true);
      }}
      onMouseLeave={() => setShowTrailer(false)}
    >
      {!showTrailer && movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title || movie.name || "Movie poster"}
          loading="lazy"
        />
      )}

      {showTrailer && trailerKey && (
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          allow="autoplay"
          title={movie.title || movie.name}
        />
      )}
    </div>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;