// src/pages/Dashboard/Tournaments/components/PairingsTab/PairingsTab.jsx

import PairingCard from "../../cards/PairingCard";

import "./PairingsTab.css";

export default function PairingsTab({
  pairings,
  currentRound,
  setCurrentRound,
}) {
  return (
    <div className="pairings-tab">

      {/* HEADER */}

      <div className="pairings-header">

        <div>

          <h2>
            Rodadas
          </h2>

          <p>
            Pairings da rodada atual
          </p>

        </div>

        <div className="round-selector">

          <button
            onClick={() =>
              setCurrentRound(
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
            Rodada {currentRound}
          </span>

          <button
            onClick={() =>
              setCurrentRound(
                (prev) =>
                  prev + 1
              )
            }
          >
            →
          </button>

        </div>

      </div>

      {/* LIST */}

      <div className="pairings-grid">

        {pairings.length > 0 ? (
          pairings.map(
            (match, index) => (
              <PairingCard
                key={index}
                match={match}
              />
            )
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