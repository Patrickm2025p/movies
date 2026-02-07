import React, { useState, useEffect } from "react";
import "./header.css";
import logo from "../../assets/react.svg";
import { FaSearch, FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header({ setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLogin", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  /* Debounce search */
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query, setSearch]);

  /* Scroll effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close menu with ESC + lock scroll */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    const esc = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", esc);

    return () => window.removeEventListener("keydown", esc);
  }, [menuOpen]);

  return (
    <>
      <header className={`app-header ${scrolled ? "scrolled" : ""}`} role="banner">
        <img src={logo} alt="SkyMovie Logo" className="logo" />

        {/* Desktop nav */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul>
            {[
              { name: "Home", path: "/" },
              { name: "Movies", path: "/movies" },
              { name: "TV Shows", path: "/tv" },
              { name: "People", path: "/people" },
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop search */}
        <div className="search-container desktop-search">
          <FaSearch aria-hidden="true" />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search movies"
          />
        </div>

        {/* User section */}
        {user && (
          <div className="user-section">
            <span className="user-name">
              <FaUser /> {user.name}
            </span>
            <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}

        {/* Mobile menu icon */}
        <button 
          className="menu-icon" 
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <FaBars />
        </button>
      </header>

      {/* Overlay */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Mobile nav */}
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        <button
          className="close-icon"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        {/* Mobile search */}
        <div className="search-container mobile-search">
          <FaSearch aria-hidden="true" />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search movies"
          />
        </div>

        <ul>
          {[
            { name: "Home", path: "/" },
            { name: "Movies", path: "/movies" },
            { name: "TV Shows", path: "/tv" },
            { name: "People", path: "/people" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {user && (
          <div className="mobile-user-section">
            <div className="mobile-user-name">
              <FaUser /> {user.name}
            </div>
            <button className="mobile-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;