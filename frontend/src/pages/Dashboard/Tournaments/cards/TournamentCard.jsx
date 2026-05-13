import { useNavigate } from "react-router-dom";

import "./TournamentCard.css";

export default function TournamentCard({
  tournament,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`tournament-card ${tournament.status}`}
      onClick={() =>
        navigate(
          `/tournaments/${tournament.id}`
        )
      }
    >
      {/* glow */}

      <div className="card-glow" />

      {/* header */}

      <div className="tournament-header">

        <span
          className={`status ${tournament.status}`}
        >
          {getStatusLabel(
            tournament.status
          )}
        </span>

      </div>

      {/* body */}

      <div className="tournament-body">

        <h3>
          {tournament.name}
        </h3>

        <p>
          {tournament.description ||
            "Participe da comunidade e dispute contra os melhores jogadores."}
        </p>

      </div>

      {/* footer */}

      <div className="tournament-footer">

        <div className="info">
          👥 {tournament.players_count || 0}
        </div>

        <div className="info">
          🏆{" "}
          {formatTournamentFormat(
            tournament.format
          )}
        </div>

      </div>

    </div>
  );
}

/* 🔥 STATUS */

function getStatusLabel(status) {
  if (status === "open")
    return "Inscrições abertas";

  if (status === "live")
    return "Ao vivo";

  if (status === "finished")
    return "Finalizado";

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
    return "Mata-Mata";
  }

  if (
    format ===
    "double_elimination"
  ) {
    return "Dupla Eliminação";
  }

  if (format === "swiss_bracket") {
    return "Suíço + Mata-Mata";
  }

  return format;
}