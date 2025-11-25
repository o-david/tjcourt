import React from "react";
import { Link } from "react-router-dom";
import data from "../data/clubData.json";
import heroImg from "../assets/placeholders/hero.svg";
import action1 from "../assets/placeholders/action1.svg";
import action2 from "../assets/placeholders/action2.svg";
import venueImg from "../assets/placeholders/venue.svg";
import SEO from "../components/SEO.jsx";

const Landing = () => {
  const d1Count = data.divisions["Division 1"].length;
  const d2Count = data.divisions["Division 2"].length;

  return (
    <div className="landing">
      <SEO
        title="TJ Table Tennis Club — Home"
        description="Premier League-inspired table, fixtures, and match stats for TJ TTC. Neutral venue, best-of-three."
        canonicalPath="/"
        ogTitle="TJ Table Tennis Club"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SportsClub",
          "name": "TJ Table Tennis Club",
          "sport": "Table Tennis",
          "member": [
            { "@type": "Person", "name": "Division 1 Players" },
            { "@type": "Person", "name": "Division 2 Players" }
          ]
        }}
      />
      {/* Hero */}
      <section className="hero glass" aria-label="Club hero">
        <div>
          <h1>TJ Table Tennis Club</h1>
          <p className="subtitle">
            Premier League-inspired experience — live table, fixtures, and match
            stats. Neutral venue, best-of-three.
          </p>
          <div className="cta-buttons">
            <Link className="btn primary" to="/table">
              View Standings
            </Link>
            <Link className="btn secondary" to="/fixtures">
              Generate Fixtures
            </Link>
          </div>
          <div className="badges" aria-label="key facts">
            <span className="badge">Division 1: {d1Count} players</span>
            <span className="badge">Division 2: {d2Count} players</span>
            <span className="badge">Neutral Venue</span>
            <span className="badge">Best of Three</span>
          </div>
        </div>
        <img src={heroImg} alt="Club hero placeholder" className="hero-image" />
      </section>

      {/* About */}
      <section className="section glass" aria-labelledby="about-title">
        <h2 id="about-title">About the Club</h2>
        <p>
          TJ Table Tennis Club is a community of passionate players across two
          divisions. We play fast, fair, and friendly matches with a focus on
          improvement, sportsmanship, and shared excitement for the game.
        </p>
      </section>

      {/* Highlights */}
      {/* <section className="section glass" aria-labelledby="highlights-title">
        <h2 id="highlights-title">Club Highlights</h2>
        <div className="section-grid">
          <div className="image-card glass" aria-label="action highlight 1">
            <img src={action1} alt="Action highlight placeholder" />
            <div className="overlay">
              <span>Matchday energy</span>
              <span className="tag">Replace image</span>
            </div>
          </div>
          <div className="image-card glass" aria-label="action highlight 2">
            <img src={action2} alt="Training highlight placeholder" />
            <div className="overlay">
              <span>Training & drills</span>
              <span className="tag">Replace image</span>
            </div>
          </div>
          <div className="image-card glass" aria-label="venue highlight">
            <img src={venueImg} alt="Venue placeholder" />
            <div className="overlay">
              <span>Our venue</span>
              <span className="tag">Replace image</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Divisions & Membership */}
      <section className="section glass" aria-labelledby="divisions-title">
        <h2 id="divisions-title">Divisions & Membership</h2>
        <p>
          We field two competitive tiers: Division 1 and Division 2. Players
          progress through performance and consistency. Interested in joining or
          sponsoring? Reach out and we’ll share the next onboarding session.
        </p>
        <ul>
          <li>Division 1 roster size: {d1Count}</li>
          <li>Division 2 roster size: {d2Count}</li>
        </ul>
      </section>

      {/* Schedule & Venue */}
      <section className="section glass" aria-labelledby="schedule-title">
        <h2 id="schedule-title">Schedule & Venue</h2>
        <p>
          We operate a neutral venue format — every match is at home. Fixtures
          can be generated on demand for club nights, and match results are
          recorded immediately for live standings.
        </p>
      </section>

      {/* Contact & Social */}
      {/* <section className="section glass" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact & Social</h2>
        <p>
          Placeholder: add email, phone, and social links here. We recommend adding Instagram/Twitter handles, and
          a short contact form for prospective members.
        </p>
      </section> */}

      {/* Footer */}
      <footer className="glass footer">
        © {new Date().getFullYear()} TJ Table Tennis Club — All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
