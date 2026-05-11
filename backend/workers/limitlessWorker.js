// backend/workers/limitlessWorker.js

import tournamentCache from "../cache/tournamentCache.js";
import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";
import { checkIfFinished } from "../utils/checkIfFinished.js";

const INTERVAL = 5 * 60 * 1000;

export function startLimitlessWorker() {
  setInterval(async () => {
    const slugs = Object.keys(tournamentCache);

    for (const slug of slugs) {
      const cache = tournamentCache[slug];

      // 🔴 se finalizado, não atualiza mais nunca
      if (cache?.finalized) continue;

      try {
        const data = await fetchLimitlessBracket(slug);

        tournamentCache[slug] = {
          data,
          lastUpdate: Date.now(),
          finalized: checkIfFinished(data),
        };
      } catch (err) {
        console.error(`Erro scraping ${slug}`, err);
      }
    }
  }, INTERVAL);
}
