// frontend\src\pages\Dashboard\Tournaments\Tournaments.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TournamentCard from "./cards/TournamentCard";

import { getTournaments } from "../../../services/tournamentService";

import "./Tournaments.css";

import img from "../../../assets/tournament-bg.jpg";

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

        /* ordena por data */

        const sorted =
          [...data].sort(
            (a, b) =>
              new Date(a.start_date) -
              new Date(b.start_date)
          );

        setTournaments(sorted);
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

          <img
            src={
              featured.banner ||
              img
            }
            alt={featured.name}
            className="hero-image"
          />

          <div className="hero-overlay" />

          <div className="hero-content">

            <span className="featured-badge">
              EVENTO EM DESTAQUE
            </span>

            <h1>
              {featured.name}
            </h1>

            <p>
              Domine os adversários e prove seu valor
              no maior evento da comunidade.
            </p>

            <button
              onClick={() =>
                navigate(
                  `/tournaments/${featured.id}`
                )
              }
            >
              Ver torneio
            </button>

          </div>

        </div>
      )}

      {/* LIST */}

      <div className="tournament-list">

        {tournaments.map(
          (tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
            />
          )
        )}

      </div>

    </div>
  );
}