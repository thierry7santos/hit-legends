// frontend\src\pages\Dashboard\Profile\Profile.jsx

import { useEffect, useState } from "react";

import { getMyProfile } from "../../../services/playerService";
import { useAuth } from "../../../context/AuthContext";

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
      <div className="profile-page">

        <div className="profile-main-card skeleton-card" />

        <div className="profile-stats-grid">

          <div className="skeleton-stat" />

          <div className="skeleton-stat" />

          <div className="skeleton-stat" />

        </div>

      </div>
    );
  }

  /* ❌ ERROR */

  if (error) {
    return (
      <div className="profile-error">

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

  /* ❌ EMPTY */

  if (!player) {
    return (
      <div className="profile-empty">
        Nenhum perfil encontrado
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* HERO */}

      <section className="profile-main-card">

        <div className="profile-glow" />

        <div className="profile-header">

          <div className="profile-avatar">
            {player.nickname?.[0]?.toUpperCase() || "?"}
          </div>

          <div className="profile-user-info">

            <span className="profile-tag">
              Jogador
            </span>

            <h1>
              {player.nickname || "Jogador"}
            </h1>

            <p>
              {user?.email}
            </p>

          </div>

        </div>

        {/* INFO */}

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

      </section>

      {/* STATS */}

      <section className="profile-stats-grid">

        <Stat
          title="Partidas"
          value={player.matches || 0}
        />

        <Stat
          title="Vitórias"
          value={player.wins || 0}
        />

        <Stat
          title="Pontos"
          value={player.points || 0}
        />

      </section>

    </div>
  );
}

/* 🔥 INFO */

function Info({ label, value }) {
  return (
    <div className="profile-info-box">

      <span className="profile-info-label">
        {label}
      </span>

      <span className="profile-info-value">
        {value}
      </span>

    </div>
  );
}

/* 📊 STAT */

function Stat({ title, value }) {
  return (
    <div className="profile-stat-card">

      <span className="profile-stat-title">
        {title}
      </span>

      <h2 className="profile-stat-value">
        {value}
      </h2>

    </div>
  );
}