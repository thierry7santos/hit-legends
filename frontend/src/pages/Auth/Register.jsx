//frontend\src\pages\Auth\Register.jsx

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  User,
  Mail,
  Lock,
  Smartphone,
  UserPlus,
} from "lucide-react";

import "./Auth.css";

import logo from "../../assets/hit-legends.png";

export default function Register() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [nickname, setNickname] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const { handleRegister } =
    useAuth();

  const navigate =
    useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await handleRegister(
        email,
        password,
        phone,
        nickname
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
            Criar conta
          </h1>

          <p>
            Entre para a comunidade
            HitLegends TCG
          </p>

        </div>

        <div className="auth-form">

          <div className="auth-input-group">

            <User size={18} />

            <input
              placeholder="Nickname"
              value={nickname}
              onChange={(e) =>
                setNickname(
                  e.target.value
                )
              }
            />

          </div>

          <div className="auth-input-group">

            <Smartphone size={18} />

            <input
              placeholder="Telefone (opcional)"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />

          </div>

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

            <UserPlus size={18} />

            Criar conta

          </button>

        </div>

        <div className="auth-footer">

          <span>
            Já possui conta?
          </span>

          <Link to="/login">
            Entrar
          </Link>

        </div>

      </form>

    </div>
  );
}