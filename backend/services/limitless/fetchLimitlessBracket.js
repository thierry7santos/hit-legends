// backend/services/limitless/fetchLimitlessBracket.js

import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchLimitlessBracket(
  slug,
  format = "single_elimination",
) {
  let phase = 1;

  /* 🏆 Swiss + Top Cut */

  if (format === "swiss_bracket") {
    phase = 2;
  }

  const url = `https://play.limitlesstcg.com/tournament/${slug}/standings?phase=${phase}&display=bracket`;

  console.log("🔥 SCRAPING:", url);

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const rounds = [];

  /* 🧩 PARSE ROUNDS */

  $(".round").each((_, roundEl) => {
    const roundName = $(roundEl).find(".round-name").first().text().trim();

    const matches = [];

    $(roundEl)
      .find(".bracket-match")
      .each((_, matchEl) => {
        const players = $(matchEl).find(".player");

        if (players.length < 2) {
          return;
        }

        const p1 = $(players[0]).find(".name").text().trim();

        const p2 = $(players[1]).find(".name").text().trim();

        const winner = $(players[0]).hasClass("winner")
          ? 1
          : $(players[1]).hasClass("winner")
            ? 2
            : 0;

        matches.push({
          player1: p1,
          player2: p2,
          winner,
        });
      });

    rounds.push({
      round: roundName,
      matches,
    });
  });

  /* 🎯 CONVERTE PRA LIB */

  const bracketMatches = [];

  const matchMap = [];

  let matchId = 1;

  /* 🧩 cria todos matches */

  rounds.forEach((round, roundIndex) => {
    round.matches.forEach((match, matchIndex) => {
      const currentId = matchId++;

      const obj = {
        id: currentId,

        nextMatchId: null,

        tournamentRoundText: round.round,

        state: "DONE",

        participants: [
          {
            id: `${currentId}-1`,

            name: match.player1,

            isWinner: match.winner === 1,

            resultText: match.winner === 1 ? "WIN" : "LOSS",

            status: null,
          },

          {
            id: `${currentId}-2`,

            name: match.player2,

            isWinner: match.winner === 2,

            resultText: match.winner === 2 ? "WIN" : "LOSS",

            status: null,
          },
        ],
      };

      matchMap.push({
        roundIndex,
        matchIndex,
        obj,
      });

      bracketMatches.push(obj);
    });
  });

  /* 🔗 conecta nextMatchId */

  rounds.forEach((_, roundIndex) => {
    const currentRoundMatches = matchMap.filter(
      (m) => m.roundIndex === roundIndex,
    );

    const nextRoundMatches = matchMap.filter(
      (m) => m.roundIndex === roundIndex + 1,
    );

    currentRoundMatches.forEach((match, index) => {
      const target = nextRoundMatches[Math.floor(index / 2)];

      if (target) {
        match.obj.nextMatchId = target.obj.id;
      }
    });
  });

  return bracketMatches;
}
