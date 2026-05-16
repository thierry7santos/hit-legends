import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Users,
  Trophy,
  ChevronRight,
} from "lucide-react";

import "./TournamentCard.css";

export default function TournamentCard({
  tournament,
}) {
  const navigate =
    useNavigate();

  function formatDate(date) {
    if (!date) return "Sem data";

    return new Date(date)
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
  }

  return (
    <div
      className="tournament-card"
      onClick={() =>
        navigate(
          `/tournaments/${tournament.id}`
        )
      }
    >

      {/* BACKGROUND */}

      <div className="tournament-card-bg" />

      {/* TOP */}

      <div className="tournament-card-top">

        <span className="tournament-status">
          {tournament.status ||
            "Em breve"}
        </span>

        <div className="tournament-format">
          {tournament.format ||
            "STANDARD"}
        </div>

      </div>

      {/* CONTENT */}

      <div className="tournament-card-content">

        <h2>
          {tournament.name}
        </h2>

        <p> {/* mudar para descrição editavel depois */}
          {tournament.description ||
            "Tem coragem para desafiar os melhores?"}
        </p>

      </div>

      {/* INFO */}

      <div className="tournament-card-info">

        <div className="info-item">

          <CalendarDays size={16} />

          <span>
            {formatDate(
              tournament.start_date
            )}
          </span>

        </div>

        <div className="info-item">

          <Users size={16} />

          <span>
            {tournament.players ||
              0} jogadores
          </span>

        </div>

        {/* <div className="info-item">

          <Trophy size={16} />

          <span>
            Ranked
          </span>

        </div> */}

      </div>

      {/* FOOTER */}

      <div className="tournament-card-footer">

        <span>
          Ver detalhes
        </span>

        <ChevronRight size={18} />

      </div>

    </div>
  );
}