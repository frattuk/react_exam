import React from "react";
import "./navbar.css";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__header">Forumas</div>
        <div className="navbar__login">
          <NavLink to="/login">Prisijungti</NavLink>
        </div>
        <div className="navbar__registration">
          <NavLink to="/registration">Registracija</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
