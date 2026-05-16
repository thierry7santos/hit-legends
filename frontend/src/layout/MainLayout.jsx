//frontend\src\layout\MainLayout.jsx

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  Home,
  Trophy,
  Gamepad2,
  Users,
  Bell,
  LogOut,
} from "lucide-react";

import "./MainLayout.css";

import logo from "../assets/hit-legends.png";

export default function MainLayout() {
  const { user, logout } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <div className="layout">

      {/* TOPBAR */}

      <header className="topbar">

        <div className="topbar-left">

          <Link
            to="/"
            className="brand"
          >
            <img
              src={logo}
              alt="HitLegends TCG"
            />

            <span>
              HitLegends TCG
            </span>
          </Link>

          <nav className="navbar">

            <NavItem
              to="/"
              icon={<Home size={18} />}
              label="Home"
              active={
                location.pathname === "/"
              }
            />

            <NavItem
              to="/tournaments"
              icon={<Gamepad2 size={18} />}
              label="Torneios"
              active={location.pathname.includes(
                "/tournaments"
              )}
            />

            <NavItem
              to="/ranking"
              icon={<Trophy size={18} />}
              label="Ranking"
              active={location.pathname.includes(
                "/ranking"
              )}
            />

            <NavItem
              to="/friends"
              icon={<Users size={18} />}
              label="Amigos"
              active={location.pathname.includes(
                "/friends"
              )}
            />

          </nav>

        </div>

        <div className="topbar-right">

          <button className="notification-btn">

            <Bell size={18} />

            <span className="notification-dot" />

          </button>

          <Link
            to="/profile"
            className="profile-box"
          >

            <div className="avatar">
              {user?.email?.[0]?.toUpperCase() ||
                "U"}
            </div>

            <div className="profile-info">

              <span className="profile-name">
                Perfil
              </span>

              <span className="profile-email">
                {user?.email}
              </span>

            </div>

          </Link>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <LogOut size={18} />
          </button>

        </div>

      </header>

      {/* CONTENT */}

      <main className="page-content">
        <Outlet />
      </main>

    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  active,
}) {
  return (
    <Link
      to={to}
      className={`nav-item ${
        active ? "active" : ""
      }`}
    >
      {icon}

      <span>{label}</span>
    </Link>
  );
}