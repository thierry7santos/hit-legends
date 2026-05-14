// src/pages/Dashboard/Tournaments/cards/StandingRow.jsx

import "./StandingRow.css";

export default function StandingRow({
  player,
  index,
  showPoints = true,
}) {
  return (
    <div className="standing-row">

      {/* 🏅 RANK */}

      <div className="standing-rank">
        #{player.rank || index + 1}
      </div>

      {/* 👤 PLAYER */}

      <div className="standing-player">

        <div className="standing-avatar">
          {player.name?.[0]?.toUpperCase()}
        </div>

        <div className="standing-player-info">

          <strong>
            {player.name}
          </strong>

          <span>
            Competidor
          </span>

        </div>

      </div>

      {/* 📊 RECORD */}

      <div className="standing-record">
        {player.record || "-"}
      </div>

      {/* ⭐ POINTS */}

      {showPoints && (
        <div className="standing-points">
          {player.points || 0} pts
        </div>
      )}

    </div>
  );
}