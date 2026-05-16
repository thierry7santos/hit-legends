// src/pages/Dashboard/Tournaments/TournamentDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import TournamentHero from "./components/TournamentHero/TournamentHero";
import TournamentTabs from "./components/TournamentTabs/TournamentTabs";
import OverviewTab from "./components/OverviewTab/OverviewTab";
import PlayersTab from "./components/PlayersTab/PlayersTab";
import StandingsTab from "./components/StandingsTab/StandingsTab";
import PairingsTab from "./components/PairingsTab/PairingsTab";
import BracketTab from "./components/BracketTab/BracketTab";

import {
  getPairings,
  getStandings,
  getBracket,
} from "../../../services/limitlessService";

import { getTournament } from "../../../services/tournamentService";

import "./TournamentDetails.css";

const REFRESH_INTERVAL =
  30 * 1000;

export default function TournamentDetails() {
  const { id } = useParams();

  const [tab, setTab] =
    useState("overview");

  const [tournament, setTournament] =
    useState(null);

  const [pairingsData, setPairingsData] =
    useState({
      currentRound: 1,
      rounds: [],
    });

  const [players, setPlayers] =
    useState([]);

  const [bracketMatches, setBracketMatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* 🔥 LOAD TOURNAMENT */

  useEffect(() => {
    async function loadTournament() {
      try {
        setLoading(true);

        const tournamentData =
          await getTournament(id);

        setTournament(
          tournamentData
        );
      } catch (err) {
        console.error(
          "Erro torneio:",
          err
        );
      } finally {
        setLoading(false);
      }
    }

    loadTournament();
  }, [id]);

  /* 🔥 LIVE DATA */

  useEffect(() => {
    if (
      !tournament?.limitless_slug
    ) {
      return;
    }

    const controller =
      new AbortController();

    async function refreshLiveData() {
      try {
        /* 📝 REGISTER */

        await axios.post(
          "http://localhost:3000/api/limitless/register",
          {
            slug:
              tournament.limitless_slug,

            format:
              tournament.format,
          }
        );

        const [
          standingsData,
          pairingsResponse,
          bracketData,
        ] = await Promise.all([
          getStandings(
            tournament.limitless_slug,
            controller.signal
          ),

          getPairings(
            tournament.limitless_slug,
            controller.signal
          ),

          getBracket(
            tournament.limitless_slug,
            tournament.format,
            controller.signal
          ),
        ]);

        setPlayers(
          Array.isArray(
            standingsData
          )
            ? standingsData
            : standingsData?.standings ||
                []
        );

        setPairingsData(
          pairingsResponse
        );

        setBracketMatches(
          bracketData
        );
      } catch (err) {
        if (
          err.name !==
          "AbortError"
        ) {
          console.error(
            "Erro live data:",
            err
          );
        }
      }
    }

    refreshLiveData();

    const interval =
      setInterval(
        refreshLiveData,
        REFRESH_INTERVAL
      );

    return () => {
      controller.abort();

      clearInterval(interval);
    };
  }, [tournament]);

  /* 🔥 LOADING */

  if (loading) {
    return (
      <div className="loading-page">
        Carregando o torneio...
      </div>
    );
  }

  /* ❌ NOT FOUND */

  if (!tournament) {
    return (
      <div className="error-box">
        Torneio não encontrado,
        informe a um administrador.
      </div>
    );
  }

  return (
    <div className="tournament-details">

      {/* 🔥 HERO */}

      <TournamentHero
        tournament={tournament}
        playersCount={players.length}
        currentRound={
          pairingsData.currentRound
        }
      />

      {/* 🧩 TABS */}

      <TournamentTabs
        tab={tab}
        setTab={setTab}
        tournament={tournament}
      />

      {/* 📦 CONTENT */}

      <div className="tab-content">

        {tab === "overview" && (
          <OverviewTab
            tournament={tournament}
            playersCount={
              players.length
            }
            currentRound={
              pairingsData.currentRound
            }
          />
        )}

        {tab === "players" && (
          <PlayersTab
            players={players}
          />
        )}

        {tab === "standings" && (
          <StandingsTab
            players={players}
            format={tournament.format}
          />
        )}

        {tab === "rounds" && (
          <PairingsTab
            pairingsData={
              pairingsData
            }
          />
        )}

        {tab === "bracket" && (
          <BracketTab
            rounds={
              bracketMatches
            }
            format={
              tournament.format
            }
          />
        )}

      </div>

    </div>
  );
}