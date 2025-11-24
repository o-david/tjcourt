import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../data/clubData.json'

const MatchesPage = () => {
  const [division, setDivision] = useState('All')
  const matches = useMemo(() => {
    return data.matches.filter(m => division === 'All' ? true : m.division === division)
  }, [division])

  return (
    <div className="main-card">
      <div className="division-toggle">
        {['All', ...Object.keys(data.divisions)].map(d => (
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
                <th>ID</th><th>Division</th><th>Players</th><th>Date</th><th>Time</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {matches.map(m => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.division}</td>
                  <td>{m.playerA} vs {m.playerB}</td>
                  <td>{m.date}</td>
                  <td>{m.time}</td>
                  <td>{m.status}</td>
                  <td><Link to={`/matches/${m.id}`}>Details</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MatchesPage