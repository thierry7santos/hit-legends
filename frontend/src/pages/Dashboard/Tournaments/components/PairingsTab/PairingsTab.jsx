import { useState } from "react";

import PairingCard from "../../cards/PairingCard";

import "./PairingsTab.css";

export default function PairingsTab({
  pairings,
}) {
  const [selectedRound, setSelectedRound] =
    useState(
      pairings.length || 1,
    );

  const currentRoundData =
    pairings.find(
      (round) =>
        round.round === selectedRound,
    );

  return (
    <div className="pairings-tab">

      {/* HEADER */}

      <div className="pairings-header">

        <div>

          <h2>
            Rodadas
          </h2>

          <p>
            Histórico completo
            do torneio
          </p>

        </div>

        <div className="round-selector">

          <button
            disabled={
              selectedRound === 1
            }
            onClick={() =>
              setSelectedRound(
                (prev) =>
                  Math.max(
                    prev - 1,
                    1,
                  ),
              )
            }
          >
            ←
          </button>

          <span>
            Rodada {selectedRound}
          </span>

          <button
            disabled={
              selectedRound ===
              pairings.length
            }
            onClick={() =>
              setSelectedRound(
                (prev) =>
                  Math.min(
                    prev + 1,
                    pairings.length,
                  ),
              )
            }
          >
            →
          </button>

        </div>

      </div>

      {/* STATUS */}

      {currentRoundData &&
        !currentRoundData.finalized && (
          <div className="live-round-banner">

            Rodada em andamento

          </div>
        )}

      {/* LIST */}

      <div className="pairings-grid">

        {currentRoundData?.matches
          ?.length > 0 ? (
          currentRoundData.matches.map(
            (match, index) => (
              <PairingCard
                key={index}
                match={match}
              />
            ),
          )
        ) : (
          <div className="empty-pairings">

            Nenhum pairing encontrado.

          </div>
        )}

      </div>

    </div>
  );
}