// frontend/src/pages/Dashboard/Ranking/Ranking.jsx

import {
  Crown,
  Medal,
  Trophy,
  Flame,
} from "lucide-react";

import "./Ranking.css";

const mockRanking = [
  {
    nickname: "Thierry",
    points: 1820,
    wins: 47,
  },
  {
    nickname: "DarkMew",
    points: 1760,
    wins: 42,
  },
  {
    nickname: "Lukinhas",
    points: 1715,
    wins: 39,
  },
  {
    nickname: "PikaMaster",
    points: 1660,
    wins: 35,
  },
  {
    nickname: "ShadowGX",
    points: 1612,
    wins: 33,
  },
];

export default function Ranking() {
  return (
    <div className="ranking-page">

      {/* HERO */}

      <section className="ranking-hero">

        <div className="ranking-glow" />

        <div className="ranking-hero-content">

          <span className="ranking-badge">
            Competitivo
          </span>

          <h1>
            Ranking Global
          </h1>

          <p>
            Os melhores jogadores da comunidade
            HitLegends TCG.
          </p>

        </div>

        <div className="ranking-hero-icon">
          <Trophy size={52} />
        </div>

      </section>

      {/* PODIUM */}

      <section className="ranking-podium">

        {mockRanking
          .slice(0, 3)
          .map((player, index) => (
            <div
              key={player.nickname}
              className={`podium-card podium-${index + 1}`}
            >

              <div className="podium-top">

                {index === 0 && (
                  <Crown size={24} />
                )}

                {index === 1 && (
                  <Medal size={22} />
                )}

                {index === 2 && (
                  <Flame size={22} />
                )}

              </div>

              <div className="podium-avatar">
                {player.nickname[0]}
              </div>

              <h3>
                {player.nickname}
              </h3>

              <span>
                {player.points} pts
              </span>

            </div>
          ))}

      </section>

      {/* TABLE */}

      <section className="ranking-table-wrapper">

        <div className="ranking-table-header">

          <h2>
            Temporada Atual
          </h2>

          <span>
            Top jogadores da comunidade
          </span>

        </div>

        <div className="ranking-table">

          {mockRanking.map(
            (player, index) => (
              <div
                key={player.nickname}
                className="ranking-row"
              >

                <div className="ranking-position">
                  #{index + 1}
                </div>

                <div className="ranking-player">

                  <div className="ranking-avatar">
                    {player.nickname[0]}
                  </div>

                  <div>

                    <strong>
                      {player.nickname}
                    </strong>

                    <span>
                      {player.wins} vitórias
                    </span>

                  </div>

                </div>

                <div className="ranking-points">
                  {player.points} pts
                </div>

              </div>
            )
          )}

        </div>

      </section>

    </div>
  );
}