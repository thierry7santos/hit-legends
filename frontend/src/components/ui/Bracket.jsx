import "./Bracket.css";

export default function Bracket({ rounds }) {
  return (
    <div className="bracket">
      {rounds.map((round, rIndex) => (
        <Round key={rIndex} round={round} index={rIndex} />
      ))}
    </div>
  );
}

function Round({ round, index }) {
  return (
    <div className="round">
      <div className="round-title">{round.name}</div>

      <div className="round-matches">
        {round.matches.map((match, i) => (
          <Match key={i} match={match} roundIndex={index} matchIndex={i} />
        ))}
      </div>
    </div>
  );
}

function Match({ match, roundIndex, matchIndex }) {
  return (
    <div
      className="match"
      style={{
        marginTop: getSpacing(roundIndex, matchIndex),
      }}
    >
      <div className={`player ${match.winner === 1 ? "winner" : ""}`}>
        {match.player1 || "-"}
      </div>

      <div className="score">{match.score || "-"}</div>

      <div className={`player ${match.winner === 2 ? "winner" : ""}`}>
        {match.player2 || "-"}
      </div>

      {/* linhas */}
      <div className="connector horizontal" />
      <div className="connector vertical" />
    </div>
  );
}

/* 🔥 MÁGICA DO LIQUIPEDIA */
function getSpacing(roundIndex, matchIndex) {
  if (roundIndex === 0) return 0;

  const base = 40;
  const multiplier = Math.pow(2, roundIndex);

  return matchIndex % 2 === 0
    ? base * (multiplier / 2)
    : base * (multiplier);
}