import React from 'react'
import { useParams, Link } from 'react-router-dom'
import data from '../data/clubData.json'

function getMatch(id) {
  return data.matches.find(m => m.id === id)
}

function computeOutcome(m) {
  let setsA = 0, setsB = 0
  for (const s of m.sets) {
    if (s.A > s.B) setsA++
    else if (s.B > s.A) setsB++
  }
  const winner = setsA > setsB ? m.playerA : m.playerB
  return { setsA, setsB, winner }
}

const MatchDetailsPage = () => {
  const { id } = useParams()
  const m = getMatch(id)
  if (!m) {
    return (
      <div className="main-card">
        <p>Match not found.</p>
        <Link to="/matches">Back to matches</Link>
      </div>
    )
  }

  const outcome = m.status === 'completed' ? computeOutcome(m) : null

  return (
    <div className="main-card">
      <h2 style={{ marginTop: 0 }}>Match Details — {m.id}</h2>
      <p style={{ color: '#9db4ff' }}>{m.division} • Neutral Venue • {m.date} {m.time}</p>
      <h3>{m.playerA} vs {m.playerB}</h3>
      {m.status === 'completed' ? (
        <div>
          <p><strong>Final:</strong> {outcome.winner} wins {outcome.setsA}-{outcome.setsB}</p>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Set</th><th>{m.playerA}</th><th>{m.playerB}</th>
                </tr>
              </thead>
              <tbody>
                {m.sets.map((s, i) => (
                  <tr key={i}><td>{i + 1}</td><td>{s.A}</td><td>{s.B}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          {m.stats && (
            <p style={{ marginTop: 8 }}>Duration: {m.stats.durationMinutes} min{m.stats.umpire ? ` • Umpire: ${m.stats.umpire}` : ''}{m.stats.notes ? ` • ${m.stats.notes}` : ''}</p>
          )}
        </div>
      ) : (
        <p>Scheduled — best of three. No scores yet.</p>
      )}
      <div style={{ marginTop: 12 }}>
        <Link to="/matches">Back to matches</Link>
      </div>
    </div>
  )
}

export default MatchDetailsPage