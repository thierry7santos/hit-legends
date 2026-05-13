// backend/controllers/limitlessController.js

import tournamentCache from "../cache/tournamentCache.js";

import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";

import { fetchLimitlessStandings } from "../services/limitless/fetchLimitlessStandings.js";

import { fetchLimitlessPairings } from "../services/limitless/fetchLimitlessPairings.js";

/* 🏆 INIT CACHE */

async function initializeTournamentCache(slug, format) {
  console.log(`🆕 Creating cache for ${slug}`);

  /* 🔒 LOCK */

  tournamentCache[slug] = {
    isFetching: true,
  };

  try {
    const standings = await fetchLimitlessStandings(slug);

    const pairings = await fetchLimitlessPairings(slug);

    const bracket = await fetchLimitlessBracket(slug, format);

    tournamentCache[slug] = {
      standings,

      pairings,

      bracket,

      updatedAt: Date.now(),

      finalized: false,

      format,

      isFetching: false,
    };
  } catch (err) {
    delete tournamentCache[slug];

    throw err;
  }
}

/* 🏆 STANDINGS */

export async function getStandings(req, res) {
  try {
    const { slug } = req.params;

    const format = req.query.format || "swiss_bracket";

    if (!tournamentCache[slug]) {
      await initializeTournamentCache(slug, format);
    }

    /* ⏳ FETCH EM ANDAMENTO */

    if (tournamentCache[slug]?.isFetching) {
      return res.status(202).json({
        loading: true,
      });
    }

    return res.json(tournamentCache[slug].standings);
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

    const format = req.query.format || "swiss_bracket";

    if (!tournamentCache[slug]) {
      await initializeTournamentCache(slug, format);
    }

    /* ⏳ FETCH EM ANDAMENTO */

    if (tournamentCache[slug]?.isFetching) {
      return res.status(202).json({
        loading: true,
      });
    }

    return res.json(tournamentCache[slug].pairings);
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

    const format = req.query.format || "single_elimination";

    if (!tournamentCache[slug]) {
      await initializeTournamentCache(slug, format);
    }

    /* ⏳ FETCH EM ANDAMENTO */

    if (tournamentCache[slug]?.isFetching) {
      return res.status(202).json({
        loading: true,
      });
    }

    return res.json(tournamentCache[slug].bracket);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar bracket",
    });
  }
}
