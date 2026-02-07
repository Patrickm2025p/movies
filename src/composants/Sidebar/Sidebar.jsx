import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";

function Sidebar() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    window.dispatchEvent(new Event("userLogin"));
  };

  const handlePremiumClick = () => {
    if (!user) {
      setShowAuth(true);
    }
  };

  return (
    <>
      <aside className="sidebar" aria-label="Advertisements">
        <div className="ad-container">
          <Link to="/featured" className="ad-box">
            <h3>Featured</h3>
            <p>Discover new movies</p>
          </Link>
          
          {user ? (
            <Link to="/premium" className="ad-box">
              <h3>Premium</h3>
              <p>Watch ad-free</p>
            </Link>
          ) : (
            <div className="ad-box" onClick={handlePremiumClick}>
              <h3>Premium</h3>
              <p>Watch ad-free</p>
            </div>
          )}
          
          <Link to="/trending" className="ad-box">
            <h3>Trending</h3>
            <p>Top picks for you</p>
          </Link>
        </div>
      </aside>

      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}

export default Sidebar;
