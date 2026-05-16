// frontend/src/pages/Dashboard/Friends/Friends.jsx

import {
  UserPlus,
  Search,
  Users,
} from "lucide-react";

import "./Friends.css";

const mockFriends = [
  {
    nickname: "DarkMew",
    status: "Online",
  },
  {
    nickname: "PikaMaster",
    status: "Em torneio",
  },
  {
    nickname: "ShadowGX",
    status: "Offline",
  },
  {
    nickname: "Thiagox",
    status: "Online",
  },
];

export default function Friends() {
  return (
    <div className="friends-page">

      {/* HERO */}

      <section className="friends-hero">

        <div className="friends-glow" />

        <div className="friends-hero-content">

          <span className="friends-badge">
            Social
          </span>

          <h1>
            Amigos
          </h1>

          <p>
            Encontre jogadores, acompanhe amigos
            e monte sua comunidade.
          </p>

        </div>

        <div className="friends-hero-icon">
          <Users size={52} />
        </div>

      </section>

      {/* SEARCH */}

      <section className="friends-search-card">

        <div className="friends-search">

          <Search size={18} />

          <input
            placeholder="Buscar jogadores..."
          />

        </div>

        <button className="friends-add-btn">

          <UserPlus size={18} />

          Adicionar amigo

        </button>

      </section>

      {/* LIST */}

      <section className="friends-grid">

        {mockFriends.map((friend) => (
          <div
            key={friend.nickname}
            className="friend-card"
          >

            <div className="friend-avatar">
              {friend.nickname[0]}
            </div>

            <div className="friend-info">

              <strong>
                {friend.nickname}
              </strong>

              <span>
                {friend.status}
              </span>

            </div>

            <div
              className={`friend-status ${
                friend.status === "Online"
                  ? "online"
                  : friend.status === "Em torneio"
                  ? "tournament"
                  : "offline"
              }`}
            />

          </div>
        ))}

      </section>

    </div>
  );
}