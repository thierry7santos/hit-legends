// src/pages/Dashboard/Tournaments/components/StandingsTab/StandingsTab.jsx

import { useMemo, useState } from "react";

import StandingRow from "../../cards/StandingRow";

import "./StandingsTab.css";

export default function StandingsTab({
  players = [],
  format,
}) {
  const [search, setSearch] =
    useState("");

  const isSingleElimination =
    format ===
    "single_elimination";

  const filteredPlayers =
    useMemo(() => {
      if (!Array.isArray(players)) {
        return [];
      }

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

        <div className="standings-search">

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

          {!isSingleElimination && (
            <span>
              Pontos
            </span>
          )}

        </div>

        <div className="standings-table-body">

          {filteredPlayers.map(
            (player, index) => (
              <StandingRow
                key={index}
                player={player}
                index={index}
                format={format}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
}