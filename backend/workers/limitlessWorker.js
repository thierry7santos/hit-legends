// backend/workers/limitlessWorker.js

import tournamentCache from "../cache/tournamentCache.js";

import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";

import { fetchLimitlessStandings } from "../services/limitless/fetchLimitlessStandings.js";

import { fetchLimitlessPairings } from "../services/limitless/fetchLimitlessPairings.js";

import { checkIfFinished } from "../utils/checkIfFinished.js";

import { saveLiveTournament } from "../services/persistence/saveLiveTournament.js";

import { saveFinishedTournament } from "../services/persistence/saveFinishedTournament.js";

const INTERVAL = 5 * 60 * 1000;

export function startLimitlessWorker() {
  setInterval(async () => {
    const slugs = Object.keys(tournamentCache);

    for (const slug of slugs) {
      const cache = tournamentCache[slug];

      if (cache?.finalized || cache?.isFetching) {
        continue;
      }

      try {
        console.log(`🔄 Updating ${slug}`);

        cache.isFetching = true;

        const standings = await fetchLimitlessStandings(slug);

        const pairings = await fetchLimitlessPairings(slug);

        const bracket = await fetchLimitlessBracket(slug, cache.format);

        const finalized = checkIfFinished(bracket);

        tournamentCache[slug] = {
          ...cache,

          standings,

          pairings,

          bracket,

          updatedAt: Date.now(),

          finalized,

          format: cache.format,

          isFetching: false,
        };

        /* 💾 SAVE LIVE */

        await saveLiveTournament({
          slug,

          standings,

          pairings,

          bracket,

          finalized,
        });

        /* 🏆 SAVE HISTORY */

        if (finalized && !cache?.finalized) {
          console.log(`🏁 Finalized ${slug}`);

          await saveFinishedTournament({
            slug,

            standings,

            pairings,

            bracket,
          });
        }

        console.log(`✅ Updated ${slug}`);
      } catch (err) {
        console.error(`❌ Erro scraping ${slug}`, err);
      }
    }
  }, INTERVAL);
}
