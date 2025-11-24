import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/tj-logo.svg";

const NavBar = () => {
  return (
    <nav className="app-nav">
      <img
        src={logo}
        alt="TJ TTC"
        style={{ width: 32, height: 32, borderRadius: 40 }}
      />
      <strong style={{ color: "#fff" }}>TJ Table Tennis Club</strong>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/table">Table</NavLink>
      <NavLink to="/fixtures">Random Fixtures</NavLink>
      <NavLink to="/matches">Matches</NavLink>
    </nav>
  );
};

export default NavBar;
