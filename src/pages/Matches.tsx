import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import clubData from '../data/clubData.json'
import SEO from '../components/SEO'
import { ClubData, Match } from '../types'

const data = clubData as ClubData

const Matches: React.FC = () => {
  const [division, setDivision] = useState<string>('All')

  const matches = useMemo<Match[]>(() => {
    return data.matches.filter((m) => (division === 'All' ? true : m.division === division))
  }, [division])

  return (
    <div className="matches-page main-card">
      <SEO
        title="Matches — TJ Table Tennis Club"
        description="Browse TJ TTC match archive. Filter by division and view details."
        canonicalPath="/matches"
      />
      <div className="division-toggle">
        {['All', ...Object.keys(data.divisions)].map((d) => (
          <button key={d} className={d === division ? 'active' : ''} onClick={() => setDivision(d)}>
            {d}
          </button>
        ))}
      </div>
      <div>
        <h2 style={{ marginTop: 0 }}>Matches {division !== 'All' ? `— ${division}` : ''}</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Division</th>
                <th>Players</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id}>
                  <td>{m.division}</td>
                  <td>
                    {m.playerA} vs {m.playerB}
                  </td>
                  <td>{m.date}</td>
                  <td>{m.time}</td>
                  <td>{m.status}</td>
                  <td>
                    <Link to={`/matches/${m.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Matches
