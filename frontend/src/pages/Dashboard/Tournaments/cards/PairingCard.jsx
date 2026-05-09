// src/pages/Dashboard/Tournaments/cards/PairingCard.jsx

import "./PairingCard.css";

export default function PairingCard({
  match,
}) {
  return (
    <div className="pairing-card">

      {/* TABLE */}

      <div className="pairing-table">
        Mesa {match.table}
      </div>

      {/* PLAYERS */}

      <div className="pairing-players">

        <div
          className={`pairing-player ${
            match.winner === 1
              ? "winner"
              : ""
          }`}
        >
          <span>
            {match.player1}
          </span>
        </div>

        <div className="pairing-score">
          {match.score}
        </div>

        <div
          className={`pairing-player ${
            match.winner === 2
              ? "winner"
              : ""
          }`}
        >
          <span>
            {match.player2}
          </span>
        </div>

      </div>

    </div>
  );
}