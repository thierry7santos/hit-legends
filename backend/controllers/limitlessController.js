// backend/controllers/limitlessController.js

import tournamentCache from "../cache/tournamentCache.js";

import { loadTournamentFromDatabase } from "../services/persistence/loadTournamentFromDatabase.js";

/* 🔥 FALLBACK */

async function getTournamentData(slug) {
  /* ✅ MEMORY CACHE */

  if (tournamentCache[slug]) {
    return tournamentCache[slug];
  }

  /* 💾 SUPABASE */

  const snapshot = await loadTournamentFromDatabase(slug);

  if (snapshot) {
    tournamentCache[slug] = snapshot;

    console.log(`💾 Loaded ${slug} from database`);
  }

  return snapshot;
}

/* 🏆 GENERIC */

async function handleRequest(req, res, key) {
  try {
    const { slug } = req.params;

    const data = await getTournamentData(slug);

    /* ❌ NOT FOUND */

    if (!data) {
      return res.json(
        key === "pairings"
          ? {
              currentRound: 0,
              rounds: [],
            }
          : [],
      );
    }

    return res.json(
      data[key] ||
        (key === "pairings"
          ? {
              currentRound: 0,
              rounds: [],
            }
          : []),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar dados do torneio",
    });
  }
}

/* 🏆 STANDINGS */

export async function getStandings(req, res) {
  return handleRequest(req, res, "standings");
}

/* 🔥 PAIRINGS */

export async function getPairings(req, res) {
  return handleRequest(req, res, "pairings");
}

/* 🏆 BRACKET */

export async function getBracket(req, res) {
  return handleRequest(req, res, "bracket");
}
