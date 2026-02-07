import React, { useEffect, useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./ActorModal.css";

function ActorModal({ actor, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!actor) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await tmdb.get(`/person/${actor.id}`);
        setDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch actor details:", err);
        setError("Failed to load actor details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleEscape = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [actor, onClose]);

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

  const profileUrl = details.profile_path
    ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal actor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {profileUrl && (
            <img src={profileUrl} alt={details.name} className="actor-modal-photo" loading="lazy" />
          )}
          <div className="modal-info">
            <h1>{details.name}</h1>
            
            {details.birthday && (
              <p><strong>Birthday:</strong> {details.birthday}</p>
            )}
            
            {details.place_of_birth && (
              <p><strong>Birthplace:</strong> {details.place_of_birth}</p>
            )}
            
            {details.known_for_department && (
              <p><strong>Known For:</strong> {details.known_for_department}</p>
            )}
            
            <p><strong>Popularity:</strong> ⭐ {details.popularity?.toFixed(1)}</p>
            
            {details.biography && (
              <div className="actor-biography">
                <h3>Biography</h3>
                <p>{details.biography}</p>
              </div>
            )}
            
            {details.also_known_as && details.also_known_as.length > 0 && (
              <div className="actor-aliases">
                <h3>Also Known As</h3>
                <ul>
                  {details.also_known_as.slice(0, 5).map((alias, idx) => (
                    <li key={idx}>{alias}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
      </div>
    </div>
  );
}

export default ActorModal;
