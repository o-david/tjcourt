import React, { useMemo, useState } from 'react'
import data from '../data/clubData.json'
import SEO from '../components/SEO.jsx'

function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const FixturesPage = () => {
  const [division, setDivision] = useState('Division 1')
  const [seed, setSeed] = useState(0)

  const fixtures = useMemo(() => {
    const players = [...data.divisions[division]]
    const randomized = shuffle(players)
    const pairs = []
    for (let i = 0; i < randomized.length; i += 2) {
      const A = randomized[i]
      const B = randomized[i + 1]
      if (A && B) {
        pairs.push({ A, B })
      } else if (A && !B) {
        pairs.push({ A, B: 'BYE' })
      }
    }
    return pairs
  }, [division, seed])

  return (
    <div className="fixtures-page main-card">
      <SEO
        title="Random Fixtures — TJ Table Tennis Club"
        description="Generate random fixtures per division for TJ TTC. Best-of-three, neutral venue."
        canonicalPath="/fixtures"
      />
      <div className="division-toggle">
        {Object.keys(data.divisions).map(d => (
          <button key={d} className={d === division ? 'active' : ''} onClick={() => setDivision(d)}>
            {d}
          </button>
        ))}
        <button onClick={() => setSeed(s => s + 1)} style={{ marginLeft: 'auto' }}>Generate Again</button>
      </div>
      <div>
        <h2 style={{ marginTop: 0 }}>Random Fixtures — {division}</h2>
        <p style={{ color: '#9db4ff' }}>Neutral venue. Best of three. Schedule as needed.</p>
        <ul>
          {fixtures.map((f, idx) => (
            <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #1f2d52' }}>
              <strong>{f.A}</strong> vs <strong>{f.B}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FixturesPage