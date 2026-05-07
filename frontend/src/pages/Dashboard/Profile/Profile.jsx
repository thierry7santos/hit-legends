import { useEffect, useState } from "react";

import { getMyProfile } from "../../../services/playerService";
import { useAuth } from "../../../context/AuthContext";

import Card from "../../../components/ui/Card";

import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();

  const [player, setPlayer] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        const data = await getMyProfile();

        console.log("PROFILE:", data);

        setPlayer(data);

        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          err.message || "Erro ao carregar perfil"
        );
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadProfile();
    }
  }, [user]);

  /* 🔥 LOADING */

  if (loading) {
    return (
      <div className="container">

        <div className="profile-card skeleton" />

        <div className="stats-grid">

          <div className="skeleton stat" />

          <div className="skeleton stat" />

          <div className="skeleton stat" />

        </div>

      </div>
    );
  }

  /* ❌ ERROR */

  if (error) {
    return (
      <div className="error-box">

        <p>{error}</p>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          Tentar novamente
        </button>

      </div>
    );
  }

  /* ❌ SEM PERFIL */

  if (!player) {
    return (
      <div className="empty-state">
        Nenhum perfil encontrado
      </div>
    );
  }

  return (
    <div className="container">

      {/* 🔥 CARD PRINCIPAL */}

      <Card className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            {player.nickname?.[0]?.toUpperCase() ||
              "?"}
          </div>

          <div>

            <h2 className="profile-name">
              {player.nickname ||
                "Jogador"}
            </h2>

            <p className="profile-sub">
              {user?.email}
            </p>

          </div>

        </div>

        {/* INFO GRID */}

        <div className="profile-info-grid">

          <Info
            label="Nickname"
            value={
              player.nickname ||
              "Não informado"
            }
          />

          <Info
            label="Email"
            value={
              user?.email ||
              "Não informado"
            }
          />

          <Info
            label="Telefone"
            value={
              player.phone_number ||
              "Não informado"
            }
          />

        </div>

      </Card>

      {/* 📊 STATS */}

      <div className="stats-grid">

        <Card>
          <Stat
            title="Partidas"
            value={
              player.matches || 0
            }
          />
        </Card>

        <Card>
          <Stat
            title="Vitórias"
            value={
              player.wins || 0
            }
          />
        </Card>

        <Card>
          <Stat
            title="Pontos"
            value={
              player.points || 0
            }
          />
        </Card>

      </div>

    </div>
  );
}

/* 🔥 INFO */

function Info({ label, value }) {
  return (
    <div>

      <p className="info-label">
        {label}
      </p>

      <p className="info-value">
        {value}
      </p>

    </div>
  );
}

/* 📊 STAT */

function Stat({ title, value }) {
  return (
    <div className="stat-box">

      <p className="stat-title">
        {title}
      </p>

      <h2 className="stat-value">
        {value}
      </h2>

    </div>
  );
}