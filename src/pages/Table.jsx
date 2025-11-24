import React, { useMemo, useState } from "react";
import data from "../data/clubData.json";

const columns = [
  { key: "rank", label: "#" },
  { key: "name", label: "Player" },
  { key: "played", label: "P" },
  { key: "wins", label: "W" },
  { key: "losses", label: "L" },
  { key: "setsFor", label: "PF" },
  { key: "setsAgainst", label: "PA" },
  { key: "setsDiff", label: "PD" },
  { key: "points", label: "Pts" },
];

function computeStandings(division) {
  const players = data.divisions[division];
  const stats = Object.fromEntries(
    players.map((p) => [
      p,
      {
        name: p,
        played: 0,
        wins: 0,
        losses: 0,
        setsFor: 0,
        setsAgainst: 0,
        points: 0,
      },
    ])
  );

  for (const m of data.matches.filter(
    (m) => m.division === division && m.status === "completed"
  )) {
    const a = stats[m.playerA];
    const b = stats[m.playerB];
    if (!a || !b) continue;
    let setsA = 0,
      setsB = 0;
    for (const s of m.sets) {
      if (s.A > s.B) setsA++;
      else if (s.B > s.A) setsB++;
      a.setsFor += s.A;
      a.setsAgainst += s.B;
      b.setsFor += s.B;
      b.setsAgainst += s.A;
    }
    a.played++;
    b.played++;
    if (setsA > setsB) {
      a.wins++;
      b.losses++;
      a.points += 3;
    } else {
      b.wins++;
      a.losses++;
      b.points += 3;
    }
  }

  const table = Object.values(stats).map((row) => ({
    ...row,
    setsDiff: row.setsFor - row.setsAgainst,
  }));
  return table;
}

const TablePage = () => {
  const [division, setDivision] = useState("Division 1");
  const [sortKey, setSortKey] = useState("points");
  const [sortDir, setSortDir] = useState("desc");

  const standings = useMemo(() => {
    const base = computeStandings(division);
    const sorted = [...base].sort((a, b) => {
      const va = a[sortKey],
        vb = b[sortKey];
      if (va === vb) return a.name.localeCompare(b.name);
      return sortDir === "desc" ? vb - va : va - vb;
    });
    return sorted.map((row, i) => ({ ...row, rank: i + 1 }));
  }, [division, sortKey, sortDir]);

  const onSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="main-card">
      <div className="division-toggle">
        {Object.keys(data.divisions).map((d) => (
          <button
            key={d}
            className={d === division ? "active" : ""}
            onClick={() => setDivision(d)}
          >
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
                  {c.label}{" "}
                  {sortKey === c.key ? (sortDir === "desc" ? "▼" : "▲") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.name}>
                {columns.map((c) => (
                  <td key={c.key}>{row[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePage;
