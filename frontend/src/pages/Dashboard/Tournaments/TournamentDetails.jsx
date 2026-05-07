import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "../../../components/ui/Card";
import Bracket from "../../../components/ui/Bracket";

import {
  getPairings,
  getStandings,
  getBracket,
} from "../../../services/limitlessService";

import { getTournament } from "../../../services/tournamentService";

import "./TournamentDetails.css";

export default function TournamentDetails() {
  const { id } = useParams();

  const [tab, setTab] =
    useState("overview");

  const [tournament, setTournament] =
    useState(null);

  const [pairings, setPairings] =
    useState([]);

  const [players, setPlayers] =
    useState([]);

  const [rounds, setRounds] =
    useState([]);

  const [currentRound, setCurrentRound] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  /* 🔥 LOAD */

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        /* 🎯 TOURNAMENT */

        const tournamentData =
          await getTournament(id);

        setTournament(
          tournamentData
        );

        /* 🔥 LIMITLESS */

        if (
          tournamentData.limitless_slug
        ) {
          /* 👥 PLAYERS */

          const standingsData =
            await getStandings(
              tournamentData.limitless_slug
            );

          setPlayers(
            standingsData
          );

          /* ⚔️ PAIRINGS */

          const pairingsData =
            await getPairings(
              tournamentData.limitless_slug,
              currentRound
            );

          setPairings(
            pairingsData
          );

          /* 🏆 BRACKET */

          const bracketData =
            await getBracket(
              tournamentData.limitless_slug
            );

          setRounds(
            bracketData
          );
        } else {
          setPlayers([]);
          setPairings([]);
          setRounds([]);
        }
      } catch (err) {
        console.error(
          "Erro torneio:",
          err
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, currentRound]);

  /* 🔥 LOADING */

  if (loading) {
    return (
      <div className="loading-page">
        Carregando torneio...
      </div>
    );
  }

  /* ❌ NOT FOUND */

  if (!tournament) {
    return (
      <div className="error-box">
        Torneio não encontrado
      </div>
    );
  }

  return (
    <div className="tournament-details">

      {/* 🔥 HERO */}

      <div className="details-hero">

        <div>

          <h1>
            {tournament.name}
          </h1>

          <span
            className={`status ${tournament.status}`}
          >
            {getStatusLabel(
              tournament.status
            )}
          </span>

          <div className="hero-info">

            <span>
              {players.length} jogadores
            </span>

            <span>
              {formatTournamentFormat(
                tournament.format
              )}
            </span>

          </div>

        </div>

        <button className="join-btn">
          Participar
        </button>

      </div>

      {/* 🧩 TABS */}

      <div className="tabs">

        <Tab
          label="Visão geral"
          active={
            tab === "overview"
          }
          onClick={() =>
            setTab("overview")
          }
        />

        <Tab
          label="Jogadores"
          active={
            tab === "players"
          }
          onClick={() =>
            setTab("players")
          }
        />

        <Tab
          label="Rodadas"
          active={
            tab === "rounds"
          }
          onClick={() =>
            setTab("rounds")
          }
        />

        <Tab
          label="Bracket"
          active={
            tab === "bracket"
          }
          onClick={() =>
            setTab("bracket")
          }
        />

      </div>

      {/* 📦 CONTENT */}

      <div className="tab-content">

        {/* OVERVIEW */}

        {tab === "overview" && (
          <Card>

            <h3>
              Sobre o torneio
            </h3>

            <p>
              {tournament.description ||
                "Nenhuma descrição disponível."}
            </p>

          </Card>
        )}

        {/* PLAYERS */}

        {tab === "players" && (
          <Players
            players={players}
          />
        )}

        {/* ROUNDS */}

        {tab === "rounds" && (
          <Card>

            <div className="round-selector">

              <button
                onClick={() =>
                  setCurrentRound(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }
              >
                ←
              </button>

              <span>
                Round {currentRound}
              </span>

              <button
                onClick={() =>
                  setCurrentRound(
                    (prev) =>
                      prev + 1
                  )
                }
              >
                →
              </button>

            </div>

            <PairingsList
              pairings={pairings}
            />

          </Card>
        )}

        {/* BRACKET */}

        {tab === "bracket" && (
          <Card>

            <Bracket
              rounds={rounds}
            />

          </Card>
        )}

      </div>

    </div>
  );
}

/* 👥 PLAYERS */

function Players({
  players,
}) {
  return (
    <div className="players-grid">

      {players.map(
        (player, index) => (
          <Card
            key={index}
            className="player-card"
          >

            <div className="player-avatar">
              {player.name?.[0]?.toUpperCase()}
            </div>

            <div>

              <h4>
                {player.name}
              </h4>

              <p>
                #{player.rank}
              </p>

            </div>

          </Card>
        )
      )}

    </div>
  );
}

/* ⚔️ PAIRINGS */

function PairingsList({
  pairings,
}) {
  return (
    <div className="rounds-container">

      {pairings.map(
        (match, index) => (
          <div
            key={index}
            className="round-match"
          >

            <div className="table-number">
              Mesa {match.table}
            </div>

            <div
              className={`player ${
                match.winner === 1
                  ? "winner"
                  : ""
              }`}
            >
              {match.player1}
            </div>

            <div className="vs">
              {match.score}
            </div>

            <div
              className={`player ${
                match.winner === 2
                  ? "winner"
                  : ""
              }`}
            >
              {match.player2}
            </div>

          </div>
        )
      )}

    </div>
  );
}

/* 🔥 TAB */

function Tab({
  label,
  active,
  onClick,
}) {
  return (
    <button
      className={`tab ${
        active
          ? "active"
          : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* 🔥 STATUS */

function getStatusLabel(
  status
) {
  if (status === "open")
    return "Inscrições abertas";

  if (status === "live")
    return "Ao vivo";

  if (
    status === "finished"
  )
    return "Finalizado";

  return status;
}

/* 🔥 FORMAT */

function formatTournamentFormat(
  format
) {
  if (
    format ===
    "single_elimination"
  ) {
    return "Eliminação simples";
  }

  if (
    format ===
    "double_elimination"
  ) {
    return "Eliminação dupla";
  }

  if (
    format === "swiss"
  ) {
    return "Suíço";
  }

  return format;
}