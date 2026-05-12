// backend/controllers/limitlessController.js

import tournamentCache from "../cache/tournamentCache.js";

import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";

import { fetchLimitlessStandings } from "../services/limitless/fetchLimitlessStandings.js";

import { fetchLimitlessPairings } from "../services/limitless/fetchLimitlessPairings.js";

/* 🏆 STANDINGS */

export async function getStandings(req, res) {
  try {
    const { slug } = req.params;

    const data = await fetchLimitlessStandings(slug);

    return res.json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar standings",
    });
  }
}

/* 🔥 PAIRINGS */

export async function getPairings(req, res) {
  try {
    const { slug } = req.params;

    const round = req.query.round || 1;

    const data = await fetchLimitlessPairings(slug, round);

    return res.json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar pairings",
    });
  }
}

/* 🏆 BRACKET */

export async function getBracket(req, res) {
  try {
    const { slug } = req.params;

    const format = req.query.format;

    if (!tournamentCache[slug]) {
      const data = await fetchLimitlessBracket(slug, format);

      tournamentCache[slug] = {
        data,

        lastUpdate: Date.now(),

        finalized: false,
      };
    }

    return res.json(tournamentCache[slug].data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar bracket",
    });
  }
}
