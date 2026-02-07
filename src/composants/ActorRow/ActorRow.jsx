import React, { useEffect, useState, useRef } from "react";
import { tmdb, requests } from "../../services/tmdb";
import ActorCard from "../ActorCard/ActorCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ActorRow.css";

function ActorRow({ title, fetchUrl, onSelectActor }) {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const rowRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadActors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (fetchUrl && requests[fetchUrl]) {
          const res = await tmdb.get(requests[fetchUrl]);
          if (isMounted) setActors(res.data.results || []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load actors");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadActors();
    return () => (isMounted = false);
  }, [fetchUrl]);

  const scroll = (direction) => {
    rowRef.current?.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  if (!actors.length && !isLoading) return null;

  return (
    <section className="actor-row">
      <h2>{title}</h2>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="row-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")} aria-label="Scroll left">
          <FaChevronLeft />
        </button>

        <div className="row-posters" ref={rowRef}>
          {actors.map((actor) => (
            <ActorCard
              key={actor.id}
              actor={actor}
              onClick={() => onSelectActor(actor)}
            />
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")} aria-label="Scroll right">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default ActorRow;
