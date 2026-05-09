// src/pages/Dashboard/Tournaments/cards/PlayerCard.jsx

import "./PlayerCard.css";

export default function PlayerCard({
  player,
}) {
  return (
    <div className="player-card">

      <div className="player-avatar">
        {player.name?.[0]?.toUpperCase()}
      </div>

      <div className="player-content">

        <h3>
          {player.name}
        </h3>

        <span>
          #{player.rank}
        </span>

      </div>

    </div>
  );
}