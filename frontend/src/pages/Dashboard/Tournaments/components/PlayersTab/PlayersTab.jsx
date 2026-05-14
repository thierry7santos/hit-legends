// src/pages/Dashboard/Tournaments/components/PlayersTab/PlayersTab.jsx

import { useMemo, useState } from "react";

import PlayerCard from "../../cards/PlayerCard";

import "./PlayersTab.css";

export default function PlayersTab({
  players = [],
}) {
  const [search, setSearch] =
    useState("");

  /* 🔥 SAFETY */

  const safePlayers =
    Array.isArray(players)
      ? players
      : [];

  /* 🔍 FILTER */

  const filteredPlayers =
    useMemo(() => {
      return safePlayers.filter(
        (player) =>
          player?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [safePlayers, search]);

  return (
    <div className="players-tab">

      {/* 🔍 SEARCH */}

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

      {/* 📊 HEADER */}

      <div className="players-header">

        <span>
          {filteredPlayers.length} jogadores
        </span>

      </div>

      {/* 👥 GRID */}

      {filteredPlayers.length > 0 ? (
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
      ) : (
        <div className="players-empty">

          <span>
            Em breve o torneio será aberto para inscrições. Fique atento!
          </span>

        </div>
      )}

    </div>
  );
}