import React, { memo } from "react";
import "./ActorCard.css";

const ActorCard = memo(({ actor, onClick }) => {
  return (
    <div className="actor-card" onClick={onClick}>
      {actor.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
          alt={actor.name || "Actor"}
          loading="lazy"
        />
      )}
      <div className="actor-card-name">{actor.name}</div>
    </div>
  );
});

ActorCard.displayName = "ActorCard";

export default ActorCard;
