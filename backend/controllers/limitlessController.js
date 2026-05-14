// backend/controllers/limitlessController.js

import tournamentCache from "../cache/tournamentCache.js";

import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";

import { fetchLimitlessStandings } from "../services/limitless/fetchLimitlessStandings.js";

import { fetchLimitlessPairings } from "../services/limitless/fetchLimitlessPairings.js";

import { checkIfFinished } from "../utils/checkIfFinished.js";

import { saveLiveTournament } from "../services/persistence/saveLiveTournament.js";

import { isValidTournamentData } from "../utils/isValidTournamentData.js";

/* ⏰ 5 MIN */

const CACHE_DURATION = 5 * 60 * 1000;

/* 🔥 REFRESH CACHE */

async function refreshTournamentCache(slug, format) {
  const cache = tournamentCache[slug];

  /* 🔒 LOCK */

  if (cache?.isFetching) {
    return cache;
  }

  try {
    tournamentCache[slug] = {
      ...cache,

      isFetching: true,
    };

    console.log(`🔥 Refreshing ${slug}`);

    /* 🔥 FETCH */

    const standings = await fetchLimitlessStandings(slug);

    const pairings = await fetchLimitlessPairings(slug);

    const bracket = await fetchLimitlessBracket(slug, format);

    const finalized = checkIfFinished(bracket);

    /* ✅ VALIDATE */

    const isValid = isValidTournamentData({
      standings,
      pairings,
    });

    /* ❌ INVALID */

    if (!isValid) {
      console.log(`⚠️ Invalid scrape ignored ${slug}`);

      tournamentCache[slug] = {
        ...cache,

        isFetching: false,
      };

      return cache || null;
    }

    /* ✅ NEW CACHE */

    const newCache = {
      standings,

      pairings,

      bracket,

      updatedAt: Date.now(),

      finalized,

      format,

      isFetching: false,
    };

    tournamentCache[slug] = newCache;

    /* 💾 SAVE */

    await saveLiveTournament({
      slug,

      standings,

      pairings,

      bracket,

      finalized,

      format,
    });

    console.log(`✅ Refreshed ${slug}`);

    return newCache;
  } catch (err) {
    console.error(`❌ Refresh error ${slug}`, err);

    /* 🔓 RELEASE LOCK */

    tournamentCache[slug] = {
      ...cache,

      isFetching: false,
    };

    return cache || null;
  }
}

/* 🏆 STANDINGS */

export async function getStandings(req, res) {
  try {
    const { slug } = req.params;

    const format = req.query.format || "swiss_bracket";

    const cache = tournamentCache[slug];

    /* ✅ CACHE EXISTS */

    if (cache?.standings) {
      const updatedAt =
        typeof cache.updatedAt === "string"
          ? new Date(cache.updatedAt).getTime()
          : cache.updatedAt;

      const isExpired = Date.now() - updatedAt > CACHE_DURATION;

      /* 🔄 BACKGROUND REFRESH */

      if (isExpired && !cache.isFetching) {
        refreshTournamentCache(slug, format);
      }

      return res.json(cache.standings);
    }

    /* ❌ NO CACHE */

    const fresh = await refreshTournamentCache(slug, format);

    return res.json(fresh?.standings || []);
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

    const cache = tournamentCache[slug];

    /* ✅ CACHE EXISTS */

    if (cache?.pairings) {
      const updatedAt =
        typeof cache.updatedAt === "string"
          ? new Date(cache.updatedAt).getTime()
          : cache.updatedAt;

      const isExpired = Date.now() - updatedAt > CACHE_DURATION;

      /* 🔄 BACKGROUND REFRESH */

      if (isExpired && !cache.isFetching) {
        refreshTournamentCache(slug, format);
      }

      return res.json(cache.pairings);
    }

    /* ❌ NO CACHE */

    const fresh = await refreshTournamentCache(slug, format);

    return res.json(
      fresh?.pairings || {
        currentRound: 0,
        rounds: [],
      },
    );
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

    const cache = tournamentCache[slug];

    /* ✅ CACHE EXISTS */

    if (cache?.bracket) {
      const updatedAt =
        typeof cache.updatedAt === "string"
          ? new Date(cache.updatedAt).getTime()
          : cache.updatedAt;

      const isExpired = Date.now() - updatedAt > CACHE_DURATION;

      /* 🔄 BACKGROUND REFRESH */

      if (isExpired && !cache.isFetching) {
        refreshTournamentCache(slug, format);
      }

      return res.json(cache.bracket);
    }

    /* ❌ NO CACHE */

    const fresh = await refreshTournamentCache(slug, format);

    return res.json(fresh?.bracket || []);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar bracket",
    });
  }
}
