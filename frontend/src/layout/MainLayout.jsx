import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Home,
  User,
  Trophy,
  Swords,
  Users,
  Gamepad2,
  LogOut,
  Pin,
} from "lucide-react";

import "./MainLayout.css";
import bgLogo from "../assets/hit-legends.png";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [pinned, setPinned] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isOpen = !collapsed || pinned;

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="layout-container">
      
      {/* SIDEBAR */}
      <aside
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        style={{ "--sidebar-bg": `url(${bgLogo})` }}
        onMouseEnter={() => !pinned && setCollapsed(false)}
        onMouseLeave={() => !pinned && setCollapsed(true)}
      >
        <div className="sidebar-effects" />
        
        <div className="sidebar-header">
          <span className="logo">
            {isOpen ? "Hit Legends" : "HL"}
          </span>

          <button onClick={() => setPinned(!pinned)} className="pin-btn">
            <Pin size={16} />
          </button>
        </div>

        <nav className="nav">
          <NavItem to="/" icon={<Home size={18} />} label="Home" isOpen={isOpen} active={location.pathname === "/"} />
          <NavItem to="/profile" icon={<User size={18} />} label="Perfil" isOpen={isOpen} active={location.pathname === "/profile"} />
          <NavItem to="/ranking" icon={<Trophy size={18} />} label="Ranking" isOpen={isOpen} active={location.pathname === "/ranking"} />
          <NavItem to="/tournaments" icon={<Gamepad2 size={18} />} label="Torneios" isOpen={isOpen} active={location.pathname === "/tournaments"} />
          <NavItem to="/matches" icon={<Swords size={18} />} label="Partidas" isOpen={isOpen} active={location.pathname === "/matches"} />
          <NavItem to="/friends" icon={<Users size={18} />} label="Amigos" isOpen={isOpen} active={location.pathname === "/friends"} />
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main-area">
        <header className="topbar">
          <div />

          <div className="user-box">
            <div className="avatar">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>

            <span>{user?.email}</span>

            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, isOpen, active }) {
  return (
    <Link
      to={to}
      className={`nav-item ${active ? "active" : ""}`}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
}