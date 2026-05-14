// backend/workers/limitlessWorker.js

import tournamentCache from "../cache/tournamentCache.js";

import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";

import { fetchLimitlessStandings } from "../services/limitless/fetchLimitlessStandings.js";

import { fetchLimitlessPairings } from "../services/limitless/fetchLimitlessPairings.js";

import { checkIfFinished } from "../utils/checkIfFinished.js";

import { isValidTournamentData } from "../utils/isValidTournamentData.js";

import { saveLiveTournament } from "../services/persistence/saveLiveTournament.js";

import { saveFinishedTournament } from "../services/persistence/saveFinishedTournament.js";

/*
  🔥 Atualiza no máximo a cada 5 minutos
*/

const INTERVAL = 5 * 60 * 1000;

export function startLimitlessWorker() {
  setInterval(async () => {
    const slugs = Object.keys(tournamentCache);

    for (const slug of slugs) {
      const cache = tournamentCache[slug];

      if (!cache) {
        continue;
      }

      /*
        🔒 evita múltiplos fetches
      */

      if (cache.isFetching) {
        continue;
      }

      /*
        🏁 torneio finalizado não atualiza mais
      */

      if (cache.finalized) {
        continue;
      }

      try {
        console.log(`🔄 Worker updating ${slug}`);

        tournamentCache[slug] = {
          ...cache,

          isFetching: true,
        };

        const standings = await fetchLimitlessStandings(slug);

        const pairings = await fetchLimitlessPairings(slug);

        const bracket = await fetchLimitlessBracket(slug, cache.format);

        /*
          ❌ scrape quebrado
          mantém cache antigo
        */

        if (
          !isValidTournamentData({
            standings,
            pairings,
            bracket,
          })
        ) {
          console.log(`⚠️ Invalid data for ${slug}, keeping previous cache`);

          tournamentCache[slug] = {
            ...cache,

            isFetching: false,
          };

          continue;
        }

        const finalized = checkIfFinished(bracket);

        /*
          ✅ sobrescreve somente com dados válidos
        */

        tournamentCache[slug] = {
          ...cache,

          standings,

          pairings,

          bracket,

          finalized,

          updatedAt: Date.now(),

          isFetching: false,
        };

        /*
          💾 salva snapshot
        */

        await saveLiveTournament({
          slug,

          standings,

          pairings,

          bracket,

          finalized,

          format: cache.format,
        });

        /*
          🏆 salva histórico final
        */

        if (finalized && !cache.finalized) {
          console.log(`🏁 Tournament finalized ${slug}`);

          await saveFinishedTournament({
            slug,

            standings,

            pairings,

            bracket,
          });
        }

        console.log(`✅ Updated ${slug}`);
      } catch (err) {
        console.error(`❌ Worker error ${slug}`, err);

        /*
          🔓 libera lock
        */

        tournamentCache[slug] = {
          ...cache,

          isFetching: false,
        };
      }
    }
  }, INTERVAL);
}
