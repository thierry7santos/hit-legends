//frontend\src\pages\Auth\Login.jsx

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/hit-legends.png";

import {
  Mail,
  Lock,
  LogIn,
} from "lucide-react";

import "./Auth.css";

export default function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const { handleLogin } =
    useAuth();

  const navigate =
    useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await handleLogin(
        email,
        password
      );

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-background" />

      <form
        className="auth-card"
        onSubmit={onSubmit}
      >

        <div className="auth-header">

          <div className="auth-logo">
            <img
              src={logo}
              alt="HitLegends TCG"
            />
          </div>

          <h1>
            Bem-vindo de volta
          </h1>

          <p>
            A sua jornada o aguarda!
          </p>

        </div>

        <div className="auth-form">

          <div className="auth-input-group">

            <Mail size={18} />

            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          <div className="auth-input-group">

            <Lock size={18} />

            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

          </div>

          <button
            className="auth-button"
            type="submit"
          >

            <LogIn size={18} />

            Entrar

          </button>

        </div>

        <div className="auth-footer">

          <span>
            Não possui conta?
          </span>

          <Link to="/register">
            Criar conta
          </Link>

        </div>

      </form>

    </div>
  );
}