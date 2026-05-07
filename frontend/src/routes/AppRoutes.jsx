import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import PrivateRoute from "./PrivateRoute";

// Páginas Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Páginas Dashboard
import Home from "../pages/Dashboard/Home";
import Profile from "../pages/Dashboard/Profile";
import Ranking from "../pages/Dashboard/Ranking";
import Tournaments from "../pages/Dashboard/Tournaments";
import Matches from "../pages/Dashboard/Matches";
import Friends from "../pages/Dashboard/Friends";

// Página de detalhes do torneio
import TournamentDetails from "../pages/Dashboard/Tournaments/TournamentDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ROTAS PROTEGIDAS */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* HOME */}
          <Route index element={<Home />} />

          {/* DASHBOARD */}
          <Route path="profile" element={<Profile />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="matches" element={<Matches />} />
          <Route path="friends" element={<Friends />} />

          {/* TORNEIOS */}
          <Route path="tournaments/:id" element={<TournamentDetails />} />
        </Route>

        {/* REDIRECIONAMENTO DEFAULT */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}