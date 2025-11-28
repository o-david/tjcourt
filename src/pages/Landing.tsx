import React from 'react'
import { Link } from 'react-router-dom'
import clubData from '../data/clubData.json'
import heroImg from '../assets/placeholders/hero.svg'
import action1 from '../assets/placeholders/action1.svg'
import action2 from '../assets/placeholders/action2.svg'
import venueImg from '../assets/placeholders/venue.svg'
import SEO from '../components/SEO'
import { ClubData } from '../types'

const data = clubData as ClubData

const Landing: React.FC = () => {
  const totalPlayers = Object.values(data.divisions).reduce((acc, arr) => acc + arr.length, 0)
  return (
    <div className="landing">
      <SEO
        title="TJ Table Tennis Club — Home"
        description="Premier League-inspired table, fixtures, and match stats for TJ TTC. Neutral venue, best-of-three."
        canonicalPath="/"
        ogTitle="TJ Table Tennis Club"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SportsClub',
          name: 'TJ Table Tennis Club',
          sport: 'Table Tennis',
          member: [
            { '@type': 'Person', name: 'Division 1 Players' },
            { '@type': 'Person', name: 'Division 2 Players' }
          ]
        }}
      />
      {/* Hero */}
      <section className="hero glass" aria-label="Club hero">
        <div className="hero-content">
          <div>
            <div className="badge">Community • Competitive • Friendly</div>
            <h1>TJ Table Tennis Club</h1>
            <p>Standings, fixtures, and match stats — inspired by the Premier League aesthetic.</p>
            <div className="cta-row">
              <Link to="/matches" className="btn primary">View Matches</Link>
              <Link to="/table" className="btn">View Standings</Link>
            </div>
            <div className="mini-stats">
              <div className="pill">Divisions: {Object.keys(data.divisions).length}</div>
              <div className="pill">Players: {totalPlayers}</div>
              <div className="pill">Completed Matches: {data.matches.filter(m => m.status === 'completed').length}</div>
            </div>
          </div>
          <img src={heroImg} alt="Club hero placeholder" className="hero-art" />
        </div>
      </section>

      {/* Highlights */}
      <section className="section glass">
        <h2>Club Highlights</h2>
        <div className="image-grid">
          <img src={action1} alt="Action shot placeholder" />
          <img src={action2} alt="Training shot placeholder" />
          <img src={venueImg} alt="Venue placeholder" />
        </div>
      </section>

      {/* Divisions */}
      <section className="section glass">
        <h2>Divisions & Membership</h2>
        <p>Two divisions for fair competition. Join us, bring your gear, and have fun.</p>
        <ul className="grid-list">
          {Object.entries(data.divisions).map(([name, players]) => (
            <li key={name}>
              <strong>{name}</strong>
              <p>{players.length} players</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Schedule */}
      <section className="section glass">
        <h2>Schedule & Venue</h2>
        <p>Neutral venue. Best-of-three format. Check fixtures or propose matches.</p>
        <div className="cta-row">
          <Link to="/fixtures" className="btn">Generate Random Fixtures</Link>
        </div>
      </section>

      {/* Contact */}
      <section className="section glass">
        <h2>Contact & Social</h2>
        <p>We will add social links and contact details here soon.</p>
      </section>

      <footer className="section glass" style={{ textAlign: 'center', color: '#9db4ff' }}>
        © {new Date().getFullYear()} TJ Table Tennis Club
      </footer>
    </div>
  )
}

export default Landing
