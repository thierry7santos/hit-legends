// frontend\src\pages\Dashboard\Home\Home.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Trophy,
  Swords,
  Store,
  ChevronRight,
  Crown,
  Sparkles,
} from "lucide-react";

import Carousel from "../../../components/ui/Carousel";

import { getHomeData } from "../../../services/homeService";

import "./Home.css";

export default function Home() {
  const navigate =
    useNavigate();

  const [data, setData] =
    useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res =
          await getHomeData();

        console.log(
          "HOME DATA:",
          res
        );

        setData(res);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  if (!data) {
    return (
      <div className="home-loading">

        <div className="home-loader" />

        <span>
          Carregando Home...
        </span>

      </div>
    );
  }

  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-glow" />

        <div className="hero-left">

          <div className="hero-badge">

            <Sparkles size={16} />

            Plataforma Oficial
            da Comunidade

          </div>

          <h1>
            O HUB competitivo
            da comunidade
            Pokémon TCG Live
          </h1>

          <p>
            Rankings, torneios,
            pairings em tempo real,
            notificações inteligentes
            e tudo que a comunidade
            precisa em um só lugar.
          </p>

          <div className="hero-actions">

            <button
              className="primary-btn"
              onClick={() =>
                navigate(
                  "/tournaments"
                )
              }
            >

              Ver torneios

              <ChevronRight
                size={18}
              />

            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate(
                  "/ranking"
                )
              }
            >
              Ranking Global
            </button>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-stat-card">

            <span>
              Players ativos
            </span>

            <h2>
              {data?.ranking
                ?.length || 0}
            </h2>

          </div>

          <div className="hero-stat-card">

            <span>
              Campeões
            </span>

            <h2>
              {data?.champions
                ?.length || 0}
            </h2>

          </div>

          <div className="hero-stat-card">

            <span>
              Torneios
            </span>

            <h2>
              {data?.banners
                ?.length || 0}
            </h2>

          </div>

        </div>

      </section>

      {/* CAROUSEL */}

      {data?.banners?.length >
        0 && (
        <section>

          <Carousel
            slides={
              data.banners
            }
          />

        </section>
      )}

      {/* CHAMPIONS */}

      <section className="section-block">

        <div className="section-header">

          <div>

            <div className="section-badge">

              <Crown size={14} />

              Hall da Fama

            </div>

            <h2>
              Campeões recentes
            </h2>

          </div>

        </div>

        <div className="champions-grid">

          {(data.champions ||
            []
          ).map((c, i) => (
            <div
              key={i}
              className="champion-card"
            >

              <div className="champion-avatar">
                {c.nickname?.[0] ||
                  "?"}
              </div>

              <h3>
                {c.nickname}
              </h3>

              <p>
                {c.tournament_name ||
                  "Campeão"}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* GRID */}

      <section className="home-grid">

        {/* RANKING */}

        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/ranking")
          }
        >

          <div className="dashboard-card-icon">

            <Trophy size={22} />

          </div>

          <h3>
            Ranking
          </h3>

          <div className="ranking-preview">

            {(data.ranking || [])
              .slice(0, 5)
              .map((r, i) => (
                <div
                  key={i}
                  className="ranking-row"
                >

                  <span>
                    #{i + 1}
                  </span>

                  <strong>
                    {
                      r.nickname
                    }
                  </strong>

                  <p>
                    {r.points ||
                      0} pts
                  </p>

                </div>
              ))}

          </div>

        </div>

        {/* TORNEIOS */}

        <div
          className="dashboard-card featured"
          onClick={() =>
            navigate(
              "/tournaments"
            )
          }
        >

          <div className="dashboard-card-icon">

            <Swords size={22} />

          </div>

          <h3>
            Torneios
          </h3>

          <p>
            Acompanhe pairings,
            standings e brackets
            em tempo real.
          </p>

        </div>

        {/* LOJA */}

        <div
          className="dashboard-card"
          onClick={() =>
            window.open(
              "https://hitlegendstcg.lovable.app/",
              "_blank"
            )
          }
        >

          <div className="dashboard-card-icon">

            <Store size={22} />

          </div>

          <h3>
            Loja
          </h3>

          <p>
            Compre cartas,
            acessórios e fortaleça
            seus decks.
          </p>

        </div>

      </section>

    </div>
  );
}