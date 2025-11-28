import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data/clubData.json";
import SEO from "../components/SEO.jsx";

function getMatch(id) {
  console.log(id);

  return data.matches.find((m) => m.id === id);
}

function computeOutcome(m) {
  console.log(m);

  let setsA = 0,
    setsB = 0;
  for (const s of m.sets) {
    if (s.A > s.B) setsA++;
    else if (s.B > s.A) setsB++;
  }
  const winner = setsA > setsB ? m.playerA : m.playerB;
  return { setsA, setsB, winner };
}

const MatchDetailsPage = () => {
  const { id } = useParams();
  const match = getMatch(id);
  if (!match) {
    return (
      <div className="main-card">
        <h2>Match Not Found</h2>
        <p>The match with ID {id} does not exist.</p>
        <Link to="/matches" className="btn">
          Back to Matches
        </Link>
      </div>
    );
  }

  // const title = `Match ${match.id}: ${match.playerA} vs ${match.playerB} — ${match.division}`;
  // const desc = `Final Score ${computeOutcome(match).setsA}-${
  //   computeOutcome(match).setsB
  // } • Best-of-three • Neutral venue.`;

  // const startDate =
  //   match.date && match.time ? `${match.date}T${match.time}:00` : undefined;
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "SportsEvent",
  //   name: title,
  //   ...(startDate ? { startDate: startDate } : {}),
  //   eventStatus: "https://schema.org/EventCompleted",
  //   sport: "Table Tennis",
  //   location: {
  //     "@type": "Place",
  //     name: "Neutral Venue",
  //   },
  //   // competitor: match.players.map((p) => ({ "@type": "Person", name: p })),
  //   result: {
  //     "@type": "AggregateRating",
  //     ratingCount: 1,
  //     ratingValue: `${match.score[0]}-${match.score[1]}`,
  //   },
  // };

  const outcome =
    match.status === "completed"
      ? computeOutcome(match)
        ? computeOutcome(match)
        : null
      : null;

  return (
    match && (
      <div className="main-card">
        {/* <SEO
          title={title}
          description={desc}
          canonicalPath={`/matches/${match.id}`}
          ogTitle={title}
          ogDescription={desc}
          jsonLd={jsonLd}
        /> */}

        <h2 style={{ marginTop: 0 }}>Match Details — {match.id}</h2>
        <p style={{ color: "#9db4ff" }}>
          {match.division} • Neutral Venue • {match.date} {match.time}
        </p>
        <h3>
          {match.playerA} vs {match.playerB}
        </h3>
        {match.status === "completed" ? (
          outcome && (
            <div>
              <p>
                <strong>Final:</strong> {outcome.winner} wins {outcome.setsA}-
                {outcome.setsB}
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
              {/* {match.stats && (
              <p style={{ marginTop: 8 }}>
                Duration: {match.stats.durationMinutes} min
                {match.stats.umpire ? ` • Umpire: ${match.stats.umpire}` : ""}
                {match.stats.notes ? ` • ${match.stats.notes}` : ""}
              </p>
            )} */}
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
  );
};

export default MatchDetailsPage;
