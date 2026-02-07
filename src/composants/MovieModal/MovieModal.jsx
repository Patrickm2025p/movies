import React, { useEffect, useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movie) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const detailsRes = await tmdb.get(`/movie/${movie.id}`);
        setDetails(detailsRes.data);

        const videoRes = await tmdb.get(`/movie/${movie.id}/videos`);
        const vid = videoRes.data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(vid?.key);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleEscape = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [movie, onClose]);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <p style={{ textAlign: 'center' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <p style={{ textAlign: 'center' }}>{error || "No details available"}</p>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>
      </div>
    );
  }

  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {posterUrl && (
            <img src={posterUrl} alt={details.title} className="modal-poster" loading="lazy" />
          )}
          <div className="modal-info">
            <h1>{details.title}</h1>
            <p>⭐ {details.vote_average?.toFixed(1)}/10</p>
            <p className="modal-overview">{details.overview || "No overview available"}</p>

            {trailer && (
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Trailer"
                allowFullScreen
              />
            )}
          </div>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
      </div>
    </div>
  );
}

export default MovieModal;