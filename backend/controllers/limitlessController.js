// backend/controllers/limitlessController.js

import tournamentCache from "../cache/tournamentCache.js";
import { fetchLimitlessBracket } from "../services/limitless/fetchLimitlessBracket.js";

export async function getBracket(req, res) {
  try {
    const { slug } = req.params;

    // 🔵 cria cache se não existir
    if (!tournamentCache[slug]) {
      const data = await fetchLimitlessBracket(slug);

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
