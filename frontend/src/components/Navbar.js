import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faHome } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (typeof onSearch === "function") {
      onSearch(query);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-relative">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FontAwesomeIcon icon={faHome} className="me-2" /> FeedFusion
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/politics">Politics</Link></li>

            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ background: "none", border: "none", color: "white" }}
              >
                Useful Links
              </button>
              <ul className="dropdown-menu custom-dropdown">
                <li><Link className="dropdown-item" to="/advertise">Advertise With Us</Link></li>
                <li><Link className="dropdown-item" to="/contactus">Contact Us</Link></li>
                <li><Link className="dropdown-item" to="/privacypolicy">Privacy Policy</Link></li>
              </ul>
            </li>

            {/* Search Bar */}
            <li className="nav-item search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
