import React from "react";
import logo from "../assets/tj-logo.svg";

const LogoLoader = ({ visible = false, text = "Loading..." }) => {
  if (!visible) return null;
  return (
    <div style={styles.backdrop} aria-live="polite" aria-busy>
      <div style={styles.container}>
        <img src={logo} alt="TJ TTC" style={styles.logo} />
        <div style={styles.pulse} />
        <p style={styles.text}>{text}</p>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(6,10,22,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  container: { display: "flex", flexDirection: "column", alignItems: "center" },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 96,
    animation: "spin 2.5s linear infinite",
  },
  pulse: {
    width: 120,
    height: 4,
    borderRadius: 2,
    background: "linear-gradient(90deg,#4B6CFD,#00D4FF)",
    marginTop: 12,
    animation: "pulse 1.4s ease-in-out infinite",
  },
  text: { marginTop: 10, color: "#fff", letterSpacing: 0.3 },
};

export default LogoLoader;