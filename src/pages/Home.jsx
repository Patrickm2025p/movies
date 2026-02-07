import React, { useState, useEffect } from "react";
import ActorsHero from "../composants/ActorsHero/ActorsHero";
import MovieRow from "../composants/MovieRow/MovieRow";
import Sidebar from "../composants/Sidebar/Sidebar";
import Footer from "../composants/footer/footer";
import { tmdb } from "../services/tmdb";
import "../pages/Home.css";

function Home({ search, onSelectMovie }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const res = await tmdb.get("/search/movie", {
          params: { query: search },
        });
        setSearchResults(res.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [search]);

  return (
    <>
      <div className="page-layout">
        <div className="main-content">
          <ActorsHero />

          {search && (
            <MovieRow
              title={`Results for "${search}"`}
              movies={searchResults}
              loading={loading}
              onSelectMovie={onSelectMovie}
            />
          )}

          {!search && (
            <>
              <MovieRow
                title="Popular Movies"
                fetchUrl="popular"
                onSelectMovie={onSelectMovie}
              />
              <MovieRow
                title="Top Rated"
                fetchUrl="topRated"
                onSelectMovie={onSelectMovie}
              />
              <MovieRow
                title="Upcoming"
                fetchUrl="upcoming"
                onSelectMovie={onSelectMovie}
              />
            </>
          )}
        </div>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default Home;