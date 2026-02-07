import React from "react";
import MovieRow from "../composants/MovieRow/MovieRow";

function People({ onSelectMovie }) {
  return (
    <>
      <MovieRow
        title="Popular Stars"
        fetchUrl="popularPeople"
        onSelectMovie={onSelectMovie}
      />
    </>
  );
}

export default People;