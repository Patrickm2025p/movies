import React from "react";
import MovieRow from "../composants/MovieRow/MovieRow";

function Movies({ onSelectMovie }) {
  return (
    <>
      <MovieRow
        title="Popular Movies"
        fetchUrl="popular"
        onSelectMovie={onSelectMovie}
      />
      <MovieRow
        title="Top Rated Movies"
        fetchUrl="topRated"
        onSelectMovie={onSelectMovie}
      />
    </>
  );
}

export default Movies;