//frontend\src\pages\Dashboard\Tournaments\TournamentDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "../../../components/ui/Card";
import Bracket from "../../../components/ui/Bracket";

import TournamentHero from "./components/TournamentHero/TournamentHero";
import TournamentTabs from "./components/TournamentTabs/TournamentTabs";
import OverviewTab from "./components/OverviewTab/OverviewTab";
import PlayersTab from "./components/PlayersTab/PlayersTab";
import StandingsTab from "./components/StandingsTab/StandingsTab";
import PairingsTab from "./components/PairingsTab/PairingsTab";

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

      <TournamentHero
        tournament={tournament}
        playersCount={players.length}
        currentRound={currentRound}
      />

      {/* 🧩 TABS */}

      <TournamentTabs
        tab={tab}
        setTab={setTab}
      />

      {/* 📦 CONTENT */}

      <div className="tab-content">

        {/* OVERVIEW */}

        {tab === "overview" && (
          <OverviewTab
            tournament={tournament}
            playersCount={players.length}
            currentRound={currentRound}
          />
        )}

        {/* PLAYERS */}

        {tab === "players" && (
          <PlayersTab
            players={players}
          />
        )}

        {/* STANDINGS */}

        {tab === "standings" && (
          <StandingsTab
            players={players}
          />
        )}

        {/* ROUNDS */}

        {tab === "rounds" && (
          <PairingsTab
            pairings={pairings}
            currentRound={currentRound}
            setCurrentRound={
              setCurrentRound
            }
          />
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
