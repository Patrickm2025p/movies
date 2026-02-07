import React, { useEffect, useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (!movie) return;

    const fetchData = async () => {
      const detailsRes = await tmdb.get(`/movie/${movie.id}`);
      setDetails(detailsRes.data);

      const videoRes = await tmdb.get(`/movie/${movie.id}/videos`);
      const vid = videoRes.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(vid?.key);
    };

    fetchData();
  }, [movie]);

  if (!details) return null;

  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {posterUrl && (
            <img src={posterUrl} alt={details.title} className="modal-poster" />
          )}
          <div className="modal-info">
            <h1>{details.title}</h1>
            <p>⭐ {details.vote_average?.toFixed(1)}/10</p>
            <p className="modal-overview">{details.overview}</p>

            {trailer && (
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Trailer"
                allowFullScreen
              />
            )}
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default MovieModal;