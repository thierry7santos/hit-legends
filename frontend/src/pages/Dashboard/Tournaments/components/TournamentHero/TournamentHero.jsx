// src/pages/Dashboard/Tournaments/components/TournamentHero/TournamentHero.jsx

import "./TournamentHero.css";

export default function TournamentHero({
  tournament,
  playersCount,
  currentRound,
}) {
  return (
    <div
      className={`tournament-hero-card ${tournament.status}`}
    >

      {/* LEFT */}

      <div className="hero-left">

        <span
          className={`hero-status ${tournament.status}`}
        >
          {getStatusLabel(
            tournament.status
          )}
        </span>

        <h1>
          {tournament.name}
        </h1>

        <div className="hero-meta">

          <HeroInfo
            label="Formato"
            value={formatTournamentFormat(
              tournament.format
            )}
          />

          <HeroInfo
            label="Players"
            value={playersCount}
          />

          {tournament.status ===
            "live" && (
            <HeroInfo
              label="Rodada"
              value={`Round ${currentRound}`}
            />
          )}

          <HeroInfo
            label="Data"
            value={
              tournament.start_date
                ? formatDate(
                    tournament.start_date
                  )
                : "Em breve"
            }
          />

        </div>

        <div className="hero-actions">

          {tournament.status ===
            "open" && (
            <button className="hero-btn primary">
              Participar
            </button>
          )}

          {tournament.status ===
            "live" && (
            <button className="hero-btn live">
              🔴 Ao vivo
            </button>
          )}

          {tournament.status ===
            "finished" && (
            <button className="hero-btn finished">
              🏆 Finalizado
            </button>
          )}

        </div>

      </div>

      {/* RIGHT */}

      <div className="hero-banner">

        <img
          src={
            tournament.banner ||
            "/banners/banner1.jpg"
          }
          alt={tournament.name}
        />

        <div className="hero-banner-overlay" />

      </div>

    </div>
  );
}

/* 🔥 INFO */

function HeroInfo({
  label,
  value,
}) {
  return (
    <div className="hero-info-box">

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

/* 🔥 DATE */

function formatDate(date) {
  return new Date(
    date
  ).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}