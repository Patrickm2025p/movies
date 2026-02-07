import React from "react";
import MovieRow from "../composants/MovieRow/MovieRow";
import Footer from "../composants/footer/footer";

function TVShows({ onSelectMovie }) {
  return (
    <>
      <MovieRow
        title="Popular TV Series"
        fetchUrl="tvPopular"
        onSelectMovie={onSelectMovie}
      />
      <MovieRow
        title="Top Rated TV Series"
        fetchUrl="tvTopRated"
        onSelectMovie={onSelectMovie}
      />
      <MovieRow
        title="On The Air TV Series"
        fetchUrl="tvOnTheAir"
        onSelectMovie={onSelectMovie}
      />
      <Footer />
    </>
  );
}

export default TVShows;