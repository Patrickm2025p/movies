import React from "react";
import MovieRow from "../composants/MovieRow/MovieRow";
import Footer from "../composants/footer/footer";

function Featured({ onSelectMovie }) {
  return (
    <>
      <div style={{ padding: "80px 30px 20px", color: "white" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Featured Movies</h1>
        <p style={{ opacity: 0.8, marginBottom: "30px" }}>Discover the newest movies on our platform</p>
      </div>
      
      <MovieRow
        title="Now Playing"
        fetchUrl="upcoming"
        onSelectMovie={onSelectMovie}
      />
      <MovieRow
        title="Popular This Week"
        fetchUrl="popular"
        onSelectMovie={onSelectMovie}
      />
      <MovieRow
        title="Top Rated"
        fetchUrl="topRated"
        onSelectMovie={onSelectMovie}
      />
      <Footer />
    </>
  );
}

export default Featured;
