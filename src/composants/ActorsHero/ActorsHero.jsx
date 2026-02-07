import React, { useEffect, useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./ActorsHero.css";

function ActorsHero() {
  const [actors, setActors] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdb.get("/person/popular")
      .then(res => setActors(res.data.results))
      .catch(err => {
        console.error("Failed to fetch actors:", err);
        setError("Failed to load actors");
      });
  }, []);

  useEffect(() => {
    if (!actors.length) return;

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % actors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [actors]);

  if (error) return null;
  if (!actors.length) return null;

  const actor = actors[index];

  return (
    <section className="actors-hero" aria-label="Featured actor">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${actor.profile_path})`
        }}
        role="img"
        aria-label={actor.name}
      />

      <div className="hero-content">
        <h1>{actor.name}</h1>
        <p>Popularity: ⭐ {actor.popularity.toFixed(1)}</p>
      </div>
    </section>
  );
}

export default ActorsHero;