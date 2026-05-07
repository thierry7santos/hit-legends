import axios from "axios";
import * as cheerio from "cheerio";

import { parseStandings } from "../services/limitless/parseStandings.js";

/* 🏆 STANDINGS */

export async function getStandings(req, res) {
  try {
    const { slug } = req.params;

    const url = `https://play.limitlesstcg.com/tournament/${slug}/standings`;

    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const standings = [];

    $("table tbody tr").each((_, row) => {
      const cols = $(row).find("td");

      if (cols.length < 4) {
        return;
      }

      const rank = $(cols[0]).text().trim();

      const name = $(cols[1]).text().replace(/\s+/g, " ").trim();

      const points = $(cols[2]).text().trim();

      const record = $(cols[3]).text().trim();

      standings.push({
        rank,
        name,
        points,
        record,
      });
    });

    res.json(standings);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar standings",
    });
  }
}
/* 🔥 PAIRINGS */

export async function getPairings(req, res) {
  try {
    const { slug } = req.params;

    const round = req.query.round || 1;

    const url = `https://play.limitlesstcg.com/tournament/${slug}/pairings?round=${round}`;

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const pairings = [];

    $("table tbody tr").each((_, row) => {
      const cols = $(row).find("td");

      /* ignora linhas inválidas */

      if (cols.length < 5) {
        return;
      }

      const table = $(cols[0]).text().trim();

      const player1Raw = $(cols[1]).text().replace(/\s+/g, " ").trim();

      const score1 = $(cols[2]).text().trim();

      const score2 = $(cols[3]).text().trim();

      const player2Raw = $(cols[4]).text().replace(/\s+/g, " ").trim();

      /* remove record grudado */

      const player1 = player1Raw.replace(/\d+-\d+-\d+$/, "").trim();

      const player2 = player2Raw.replace(/\d+-\d+-\d+$/, "").trim();

      pairings.push({
        table,

        player1,

        player2,

        score: `${score1}-${score2}`,

        winner:
          Number(score1) > Number(score2)
            ? 1
            : Number(score2) > Number(score1)
              ? 2
              : null,
      });
    });

    res.json(pairings);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erro ao buscar pairings",
    });
  }
}

/* 🔥 BRACKET */

export async function getBracket(req, res) {
  try {
    const players = Number(req.query.players) || 32;

    const rounds = generateBracket(players);

    res.json(rounds);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao gerar bracket",
    });
  }
}

/* 🎯 GENERATOR */

function generateBracket(players) {
  const rounds = [];

  let matches = players / 2;

  let roundNumber = 1;

  while (matches >= 1) {
    rounds.push({
      name: `Round ${roundNumber}`,

      matches: Array(matches)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,

          player1: "TBD",

          player2: "TBD",

          score: null,

          winner: null,
        })),
    });

    matches /= 2;

    roundNumber++;
  }

  return rounds;
}
