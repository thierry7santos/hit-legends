// src/pages/Dashboard/Tournaments/components/OverviewTab/OverviewTab.jsx

import "./OverviewTab.css";

export default function OverviewTab({
  tournament,
  playersCount,
  currentRound,
}) {
  return (
    <div className="overview-tab">

      {/* LEFT */}

      <div className="overview-main">

        <div className="overview-grid">

            <InfoCard
            label="Formato"
            value={formatTournamentFormat(
                tournament.format
            )}
            />

            <InfoCard
            label="Status"
            value={getStatusLabel(
                tournament.status
            )}
            />

            <InfoCard
            label="Jogadores"
            value={playersCount}
            />

            <InfoCard
            label="Rodada Atual"
            value={`Round ${currentRound}`}
            />

        </div>

        <div className="overview-card">

          <div className="overview-card-header">

            <span>
              Sobre o torneio
            </span>

          </div>

          <h2>
            {tournament.name}
          </h2>

          <p>
            {tournament.description ||
              "Nenhuma descrição disponível para este torneio."}
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="overview-side">

        <div className="side-card">

          <span>
            Prêmio
          </span>

          <strong>
            Em breve
          </strong>

        </div>

        <div className="side-card">

          <span>
            Check-in
          </span>

          <strong>
            Fechado
          </strong>

        </div>

        <div className="side-card">

          <span>
            Plataforma
          </span>

          <strong>
            Pokémon TCG Pocket
          </strong>

        </div>

      </div>

    </div>
  );
}

/* 🔥 INFO CARD */

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="info-card">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}

/* 🔥 STATUS */

function getStatusLabel(
  status
) {
  if (status === "open") {
    return "Inscrições abertas";
  }

  if (status === "live") {
    return "Ao vivo";
  }

  if (
    status === "finished"
  ) {
    return "Finalizado";
  }

  return status;
}

/* 🔥 FORMAT */

function formatTournamentFormat(
  format
) {
  if (
    format ===
    "single_elimination"
  ) {
    return "Eliminação simples";
  }

  if (
    format ===
    "double_elimination"
  ) {
    return "Eliminação dupla";
  }

  if (
    format === "swiss"
  ) {
    return "Suíço";
  }

  return format;
}