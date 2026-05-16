import { useEffect, useState } from "react";

import PairingCard from "../../cards/PairingCard";

import "./PairingsTab.css";

export default function PairingsTab({
  pairingsData,
}) {
  const rounds =
    pairingsData?.rounds || [];

  const currentRound =
    pairingsData?.currentRound || 1;

  const [
    selectedRound,
    setSelectedRound,
  ] = useState(currentRound);

  /* 🔄 AUTO UPDATE */

  useEffect(() => {
    if (currentRound > 0) {
      setSelectedRound(
        currentRound
      );
    }
  }, [currentRound]);

  /* 🎯 ROUND DATA */

  const currentRoundData =
    rounds.find(
      (round) =>
        round.round ===
        `Round ${selectedRound}`
    );

  return (
    <div className="pairings-tab">

      {/* HEADER */}

      <div className="pairings-header">

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
                    1
                  )
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
              rounds.length
            }
            onClick={() =>
              setSelectedRound(
                (prev) =>
                  Math.min(
                    prev + 1,
                    rounds.length
                  )
              )
            }
          >
            →
          </button>
        
        </div>
        
        {/* LIVE */}

      {currentRoundData &&
        !currentRoundData.finalized && (
          <div className="live-round-banner">

            <span className="live-dot" />

            Rodada em andamento

          </div>
        )}

      </div>

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
            )
          )
        ) : (
          <div className="empty-pairings">

            <span>
              Nenhum pairing encontrado.
            </span>

          </div>
        )}

      </div>

    </div>
  );
}