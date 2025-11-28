import React, { useMemo, useState } from 'react'
import SEO from '../components/SEO'
import clubData from '../data/clubData.json'
import { ClubData, PlayerRow, Match } from '../types'

const data = clubData as ClubData

type SortKey = keyof PlayerRow | 'setsDiff'

type Column = { key: SortKey | 'rank' | 'name'; label: string }

const columns: Column[] = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Player' },
  { key: 'played', label: 'P' },
  { key: 'wins', label: 'W' },
  { key: 'losses', label: 'L' },
  { key: 'setsFor', label: 'PF' },
  { key: 'setsAgainst', label: 'PA' },
  { key: 'setsDiff', label: 'PD' },
  { key: 'points', label: 'Pts' }
]

function computeStandings(division: string): PlayerRow[] {
  const players = data.divisions[division] || []
  const stats: Record<string, PlayerRow> = Object.fromEntries(
    players.map((p) => [
      p,
      {
        name: p,
        played: 0,
        wins: 0,
        losses: 0,
        setsFor: 0,
        setsAgainst: 0,
        points: 0
      } as PlayerRow
    ])
  )

  for (const m of data.matches.filter(
    (m: Match) => m.division === division && m.status === 'completed'
  )) {
    const a = stats[m.playerA]
    const b = stats[m.playerB]
    if (!a || !b) continue

    let setsA = 0
    let setsB = 0
    for (const s of m.sets) {
      if (s.A > s.B) setsA++
      else if (s.B > s.A) setsB++
      a.setsFor += s.A
      a.setsAgainst += s.B
      b.setsFor += s.B
      b.setsAgainst += s.A
    }
    a.played++
    b.played++
    if (setsA > setsB) {
      a.wins++
      b.losses++
      a.points += 3
    } else {
      b.wins++
      a.losses++
      b.points += 3
    }
  }

  const table = Object.values(stats).map((row) => ({
    ...row,
    setsDiff: row.setsFor - row.setsAgainst
  }))
  return table
}

const Table: React.FC = () => {
  const [division, setDivision] = useState<string>('Division 1')
  const [sortKey, setSortKey] = useState<SortKey>('points')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const standings = useMemo(() => {
    const base = computeStandings(division)
    const sorted = [...base].sort((a, b) => {
      const va = a[sortKey as keyof PlayerRow] as unknown
      const vb = b[sortKey as keyof PlayerRow] as unknown

      if (typeof va === 'number' && typeof vb === 'number') {
        if (va === vb) return a.name.localeCompare(b.name)
        return sortDir === 'desc' ? (vb as number) - (va as number) : (va as number) - (vb as number)
      }

      // Fallback for name or other non-numeric sorts
      const sa = String(va)
      const sb = String(vb)
      if (sa === sb) return a.name.localeCompare(b.name)
      return sortDir === 'desc' ? sb.localeCompare(sa) : sa.localeCompare(sb)
    })
    return sorted.map((row, i) => ({ ...row, rank: i + 1 }))
  }, [division, sortKey, sortDir])

  const onSort = (key: SortKey | 'rank' | 'name') => {
    if (key === 'rank') return // rank is derived
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      if (key === 'name') setSortKey('name' as SortKey)
      else setSortKey(key as SortKey)
      setSortDir('desc')
    }
  }

  return (
    <div className="table-page main-card">
      <SEO
        title="Standings — TJ Table Tennis Club"
        description="Live standings for TJ TTC across divisions. Sortable stats from match results."
        canonicalPath="/table"
      />

      <div className="division-toggle">
        {Object.keys(data.divisions).map((d) => (
          <button key={d} className={d === division ? 'active' : ''} onClick={() => setDivision(d)}>
            {d}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} onClick={() => onSort(c.key)}>
                  {c.label} {sortKey === c.key ? (sortDir === 'desc' ? '▼' : '▲') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.name}>
                {columns.map((c) => (
                  <td key={c.key}>{(row as any)[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
