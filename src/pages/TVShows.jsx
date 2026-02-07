// Import the React library for building components
import React from "react";
// Import the MovieRow component to display rows of movies/tv shows
import MovieRow from "../composants/MovieRow/MovieRow";

/**
 * TVShows Component
 * Displays TV series organized into different categories
 * @param {Function} onSelectMovie - Callback function triggered when user clicks on a movie/series
 */
function TVShows({ onSelectMovie }) {
  return (
    <>
      {/* First row displaying popular TV series */}
      <MovieRow
        title="Popular TV Series" // Title shown above the row
        fetchUrl="tvPopular" // API endpoint key to fetch popular TV shows
        onSelectMovie={onSelectMovie} // Pass the callback function to handle movie selection
      />
      
      {/* Second row displaying top rated TV series */}
      <MovieRow
        title="Top Rated TV Series" // Title shown above the row
        fetchUrl="tvTopRated" // API endpoint key to fetch top rated TV shows
        onSelectMovie={onSelectMovie} // Pass the callback function to handle movie selection
      />
      
      {/* Third row displaying currently airing TV series */}
      <MovieRow
        title="On The Air TV Series" // Title shown above the row
        fetchUrl="tvOnTheAir" // API endpoint key to fetch TV shows currently on the air
        onSelectMovie={onSelectMovie} // Pass the callback function to handle movie selection
      />
    </>
  );
}

// Export the TVShows component as the default export for use in other files
export default TVShows;