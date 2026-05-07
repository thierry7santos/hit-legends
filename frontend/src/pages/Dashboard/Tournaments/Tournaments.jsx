import { useEffect, useState } from "react";
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

        setTournaments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="loading-page">
        Carregando torneios...
      </div>
    );
  }

  const featured =
    tournaments[0];

  return (
    <div className="tournaments">

      {/* HERO */}

      {featured && (
        <div className="tournament-hero">

          <div className="hero-content">

            <h1>
              {featured.name}
            </h1>

            <p>
              Domine os adversários e prove seu valor
            </p>

            <button
              onClick={() =>
                navigate(
                  `/tournaments/${featured.id}`
                )
              }
            >
              Participar
            </button>

          </div>

        </div>
      )}

      {/* LIST */}

      <div className="tournament-list">

        {tournaments.map((t) => (
          <Card
            key={t.id}
            className={`tournament-card ${t.status}`}
            onClick={() =>
              navigate(
                `/tournaments/${t.id}`
              )
            }
          >
            <div className="tournament-header">

              <h3>{t.name}</h3>

              <span
                className={`status ${t.status}`}
              >
                {getStatusLabel(
                  t.status
                )}
              </span>

            </div>

            <div className="tournament-info">

              <p>
                {t.players_count} jogadores
              </p>

              <p>
                {t.format}
              </p>

            </div>

          </Card>
        ))}

      </div>

    </div>
  );
}

function getStatusLabel(status) {
  if (status === "open")
    return "Inscrições abertas";

  if (status === "live")
    return "Ao vivo";

  if (status === "finished")
    return "Finalizado";

  return status;
}