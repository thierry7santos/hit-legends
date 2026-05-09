// src/pages/Dashboard/Tournaments/components/PlayersTab/PlayersTab.jsx

import { useMemo, useState } from "react";

import PlayerCard from "../../cards/PlayerCard";

import "./PlayersTab.css";

export default function PlayersTab({
  players,
}) {
  const [search, setSearch] =
    useState("");

  const filteredPlayers =
    useMemo(() => {
      return players.filter(
        (player) =>
          player.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [players, search]);

  return (
    <div className="players-tab">

      {/* SEARCH */}

      <div className="players-search">

        <input
          type="text"
          placeholder="Buscar jogador..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* GRID */}

      <div className="players-grid">

        {filteredPlayers.map(
          (player, index) => (
            <PlayerCard
              key={index}
              player={player}
            />
          )
        )}

      </div>

    </div>
  );
}