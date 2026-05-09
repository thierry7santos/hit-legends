import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/ui/Card";

import { getTournaments } from "../../../services/tournamentService";

import "./Tournaments.css";

export default function Tournaments() {
  const navigate = useNavigate();

  const [tournaments, setTournaments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getTournaments();

        setTournaments(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* 🔥 ORDENA POR DATA */

  const sortedTournaments =
    useMemo(() => {
      return [...tournaments].sort(
        (a, b) =>
          new Date(
            a.start_date
          ) -
          new Date(
            b.start_date
          )
      );
    }, [tournaments]);

  /* 🔥 HERO */

  const featured =
    sortedTournaments.find(
      (t) =>
        t.status === "live"
    ) ||
    sortedTournaments.find(
      (t) =>
        t.status === "open"
    ) ||
    sortedTournaments[0];

  if (loading) {
    return (
      <div className="loading-page">
        Carregando torneios...
      </div>
    );
  }

  return (
    <div className="tournaments">

      {/* 🔥 HERO */}

      {featured && (
        <div
          className="tournament-hero"
          onClick={() =>
            navigate(
              `/tournaments/${featured.id}`
            )
          }
        >

          <div className="hero-overlay" />

          <div className="hero-content">

            <span
              className={`hero-status ${featured.status}`}
            >
              {getStatusLabel(
                featured.status
              )}
            </span>

            <h1>
              {featured.name}
            </h1>

            <p>
              {
                featured.description
              ||
                "Participe da batalha e suba no ranking da comunidade."
              }
            </p>

            <div className="hero-meta">

              <div className="meta-box">
                <strong>
                  {
                    featured.players_count ||
                    0
                  }
                </strong>

                <span>
                  Jogadores
                </span>
              </div>

              <div className="meta-box">
                <strong>
                  {formatTournamentFormat(
                    featured.format
                  )}
                </strong>

                <span>
                  Formato
                </span>
              </div>

            </div>

            <button>
              Ver torneio
            </button>

          </div>

        </div>
      )}

      {/* 🔥 HEADER */}

      <div className="section-header">

        <div>
          <h2>
            Torneios da Comunidade
          </h2>

          <p>
            Todos os eventos organizados pela Hit Legends
          </p>
        </div>

        <span className="tournament-count">
          {
            sortedTournaments.length
          } torneios
        </span>

      </div>

      {/* 🔥 GRID */}

      <div className="tournament-list">

        {sortedTournaments.map(
          (tournament) => (
            <Card
              key={
                tournament.id
              }
              className={`tournament-card ${tournament.status}`}
              onClick={() =>
                navigate(
                  `/tournaments/${tournament.id}`
                )
              }
            >

              <div className="card-glow" />

              {/* HEADER */}

              <div className="tournament-header">

                <span
                  className={`status ${tournament.status}`}
                >
                  {getStatusLabel(
                    tournament.status
                  )}
                </span>

                <span className="players-badge">
                  {
                    tournament.players_count ||
                    0
                  } players
                </span>

              </div>

              {/* BODY */}

              <div className="tournament-body">

                <h3>
                  {
                    tournament.name
                  }
                </h3>

                <p>
                  {
                    tournament.description ||
                    "Sem descrição disponível."
                  }
                </p>

              </div>

              {/* FOOTER */}

              <div className="tournament-footer">

                <div className="footer-item">

                  <span>
                    Formato
                  </span>

                  <strong>
                    {formatTournamentFormat(
                      tournament.format
                    )}
                  </strong>

                </div>

                <div className="footer-item">

                  <span>
                    Início
                  </span>

                  <strong>
                    {formatDate(
                      tournament.start_date
                    )}
                  </strong>

                </div>

              </div>

            </Card>
          )
        )}

      </div>

    </div>
  );
}

/* 🔥 STATUS */

function getStatusLabel(
  status
) {
  if (status === "open")
    return "Inscrições abertas";

  if (status === "live")
    return "Ao vivo";

  if (
    status === "finished"
  )
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
  if (!date)
    return "Sem data";

  return new Date(
    date
  ).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
    }
  );
}