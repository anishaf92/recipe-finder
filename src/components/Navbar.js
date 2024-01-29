import React, { useState } from "react";
import Hamburger from "./Hamburger";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="logo">Recipe Finder</div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <Hamburger />
          </div>
          <div className={`nav-elements ${showNavbar && "active"}`}>
            <ul>
              <li>
                <NavLink to="/" onClick={() => setShowNavbar(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/favourites" onClick={() => setShowNavbar(false)}>
                  Favourites
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
