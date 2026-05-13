// src/pages/Dashboard/Tournaments/components/StandingsTab/StandingsTab.jsx

import { useMemo, useState } from "react";

import StandingRow from "../../cards/StandingRow";

import "./StandingsTab.css";

export default function StandingsTab({
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
    <div className="standings-tab">

      {/* HEADER */}

      <div className="standings-header">

        <div>

          <h2>
            Classificação
          </h2>

          <p>
            Ranking atual do torneio
          </p>

        </div>

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

      {/* TABLE */}

      <div className="standings-table">

        <div className="standings-table-head">

          <span>
            Rank
          </span>

          <span>
            Jogador
          </span>

          <span>
            V - D - E
          </span>

          <span>
            Pontos
          </span>

        </div>

        <div className="standings-table-body">

          {filteredPlayers.map(
            (player, index) => (
              <StandingRow
                key={index}
                player={player}
                index={index}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
}