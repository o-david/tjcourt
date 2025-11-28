import React from 'react'
import { useParams, Link } from 'react-router-dom'
import clubData from '../data/clubData.json'
import SEO from '../components/SEO'
import { ClubData, Match } from '../types'

const data = clubData as ClubData

function getMatch(id?: string): Match | undefined {
  if (!id) return undefined
  return data.matches.find((m) => m.id === id)
}

function computeOutcome(m: Match): { setsA: number; setsB: number; winner: string } {
  let setsA = 0
  let setsB = 0
  for (const s of m.sets) {
    if (s.A > s.B) setsA++
    else if (s.B > s.A) setsB++
  }
  const winner = setsA > setsB ? m.playerA : m.playerB
  return { setsA, setsB, winner }
}

const MatchDetails: React.FC = () => {
  const { id } = useParams()
  const match = getMatch(id)

  if (!match) {
    return (
      <div className="main-card">
        <h2>Match Not Found</h2>
        <p>The match with ID {id} does not exist.</p>
        <Link to="/matches" className="btn">
          Back to Matches
        </Link>
      </div>
    )
  }

  const outcome = match.status === 'completed' ? computeOutcome(match) : null

  return (
    <div className="main-card">
      {/*
      const title = `Match ${match.id}: ${match.playerA} vs ${match.playerB} — ${match.division}`
      const desc = `Final Score ${outcome?.setsA}-${outcome?.setsB} • Best-of-three • Neutral venue.`
      const startDate = match.date && match.time ? `${match.date}T${match.time}:00` : undefined
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: title,
        ...(startDate ? { startDate } : {}),
        eventStatus: 'https://schema.org/EventCompleted',
        sport: 'Table Tennis',
        location: { '@type': 'Place', name: 'Neutral Venue' }
      }
      <SEO title={title} description={desc} canonicalPath={`/matches/${match.id}`} ogTitle={title} ogDescription={desc} jsonLd={jsonLd} />
      */}

      <h2 style={{ marginTop: 0 }}>Match Details — {match.id}</h2>
      <p style={{ color: '#9db4ff' }}>
        {match.division} • Neutral Venue • {match.date} {match.time}
      </p>
      <h3>
        {match.playerA} vs {match.playerB}
      </h3>
      {match.status === 'completed' ? (
        outcome && (
          <div>
            <p>
              <strong>Final:</strong> {outcome.winner} wins {outcome.setsA}-{outcome.setsB}
            </p>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>{match.playerA}</th>
                    <th>{match.playerB}</th>
                  </tr>
                </thead>
                <tbody>
                  {match.sets.map((s, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{s.A}</td>
                      <td>{s.B}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <p>Scheduled — best of three. No scores yet.</p>
      )}
      <div style={{ marginTop: 12 }}>
        <Link to="/matches">Back to matches</Link>
      </div>
    </div>
  )
}

export default MatchDetails
