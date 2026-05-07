import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/ui/Card";
import Carousel from "../../../components/ui/Carousel";

import { getHomeData } from "../../../services/homeService";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getHomeData();

        console.log("HOME DATA:", res);

        setData(res);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  if (!data) {
    return (
      <div className="loading-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="home">

      {/* 🎞️ CARROSSEL */}
      <Carousel slides={data.banners || []} />

      {/* 🔥 BANNER */}
      <div className="home-banner">

        <div className="banner-content">
          <h1>Próximo Torneio</h1>

          <p>
            Domine o meta. Mostre sua estratégia.
          </p>

          <button
            onClick={() =>
              navigate("/tournaments")
            }
          >
            Ver torneios
          </button>
        </div>

      </div>

      {/* 🏆 CAMPEÕES */}
      <div className="champions">

        {(data.champions || []).map((c, i) => (
          <div
            key={i}
            className="champion-card"
          >
            <div className="champion-avatar">
              {c.nickname?.[0] || "?"}
            </div>

            <h3>{c.nickname}</h3>

            <p>
              {c.tournament_name ||
                "Campeão"}
            </p>
          </div>
        ))}

      </div>

      {/* ⚡ GRID */}
      <div className="home-grid">

        {/* RANKING */}
        <Card
          onClick={() =>
            navigate("/ranking")
          }
          className="home-card"
        >
          <h3>Ranking</h3>

          {(data.ranking || [])
            .slice(0, 3)
            .map((r, i) => (
              <p key={i}>
                #{i + 1} {r.nickname} -{" "}
                {r.points || 0}
              </p>
            ))}
        </Card>

        {/* TORNEIOS */}
        <Card
          className="home-card highlight"
          onClick={() =>
            navigate("/tournaments")
          }
        >
          <h3>Torneios</h3>

          <p>
            Mostre sua força entre os
            melhores jogadores da comunidade
          </p>
        </Card>

        {/* LOJA */}
        <Card
          className="home-card"
          onClick={() =>
            window.open(
              "https://hitlegendstcg.lovable.app/",
              "_blank"
            )
          }
        >
          <h3>Loja</h3>

          <p>
            Compre cartas e fortaleça seus decks
          </p>
        </Card>

      </div>
    </div>
  );
}