// backend\controllers\cronController.js

import tournamentCache from "../cache/tournamentCache.js";

import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";

import { fetchLimitlessStandings } from "../services/limitless/fetchLimitlessStandings.js";

import { fetchLimitlessPairings } from "../services/limitless/fetchLimitlessPairings.js";

import { checkIfFinished } from "../utils/checkIfFinished.js";

import { saveLiveTournament } from "../services/persistence/saveLiveTournament.js";

import { saveFinishedTournament } from "../services/persistence/saveFinishedTournament.js";

import { detectTournamentChanges } from "../services/live/detectTournamentChanges.js";

import { saveTournamentEvent } from "../services/persistence/saveTournamentEvent.js";

/* 🏆 FORMATS */

function supportsBracket(format) {
  return (
    format === "single_elimination" ||
    format === "double_elimination" ||
    format === "swiss_bracket"
  );
}

/* ✅ VALIDATE */

function isValidData(standings, pairings) {
  return (
    Array.isArray(standings) &&
    standings.length > 0 &&
    pairings &&
    Array.isArray(pairings.rounds)
  );
}

/* 🚀 CRON */

export async function runCron(req, res) {
  try {
    const slugs = Object.keys(tournamentCache);

    console.log(`🔄 Cron started (${slugs.length})`);

    for (const slug of slugs) {
      const cache = tournamentCache[slug];

      if (!cache) {
        continue;
      }

      if (cache.isFetching) {
        continue;
      }

      if (cache.finalized) {
        continue;
      }

      try {
        console.log(`🔄 Updating ${slug}`);

        tournamentCache[slug] = {
          ...cache,

          isFetching: true,
        };

        const standings = await fetchLimitlessStandings(slug);

        const pairings = await fetchLimitlessPairings(slug);

        if (!isValidData(standings, pairings)) {
          console.log(`⚠️ Invalid scrape ${slug}`);

          tournamentCache[slug] = {
            ...cache,

            isFetching: false,
          };

          continue;
        }

        let bracket = [];

        if (supportsBracket(cache.format)) {
          bracket = await fetchLimitlessBracket(slug, cache.format);
        }

        const finalized = supportsBracket(cache.format)
          ? checkIfFinished(bracket)
          : false;

        const updatedData = {
          ...cache,

          standings,

          pairings,

          bracket,

          finalized,

          updatedAt: Date.now(),

          isFetching: false,
        };

        const events = detectTournamentChanges(cache, updatedData);

        /* 💾 UPDATE CACHE */

        tournamentCache[slug] = updatedData;

        /* 💾 SAVE SNAPSHOT */

        await saveLiveTournament({
          slug,

          standings,

          pairings,

          bracket,

          finalized,

          format: cache.format,
        });

        /* 🔔 SAVE EVENTS */

        for (const event of events) {
          await saveTournamentEvent({
            slug,

            type: event.type,

            payload: event,
          });
        }

        if (finalized && !cache.finalized) {
          await saveFinishedTournament({
            slug,

            standings,

            pairings,

            bracket,
          });
        }

        console.log(`✅ Updated ${slug}`);
      } catch (err) {
        console.error(`❌ Cron error ${slug}`, err);

        tournamentCache[slug] = {
          ...cache,

          isFetching: false,
        };
      }
    }

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Cron failed",
    });
  }
}
