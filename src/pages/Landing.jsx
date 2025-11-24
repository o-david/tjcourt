import React from "react";
import logo from "../assets/tj-logo.svg";

const Landing = () => {
  return (
    <div
      className="main-card"
      style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}
    >
      <img
        src={logo}
        alt="TJ TTC"
        style={{ width: 120, height: 120, borderRadius: 120 }}
      />
      <div>
        <h1 style={{ margin: 0 }}>TJ Table Tennis Club</h1>
        <p style={{ marginTop: 8, color: "#9db4ff" }}>
          Welcome! This web app tracks divisions, matches, and standings for our
          club.
        </p>
        <ul>
          <li>View the live table for Division 1 and Division 2</li>
          <li>Generate random fixtures for upcoming rounds</li>
          <li>Explore detailed match statistics and set-by-set scores</li>
        </ul>
      </div>
    </div>
  );
};

export default Landing;
