import React from "react";
import MovieRow from "../composants/MovieRow/MovieRow";
import Sidebar from "../composants/Sidebar/Sidebar";
import Footer from "../composants/footer/footer";
import "../pages/Home.css";

function Movies({ onSelectMovie }) {
  return (
    <>
      <div className="page-layout">
        <div className="main-content">
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
        </div>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default Movies;