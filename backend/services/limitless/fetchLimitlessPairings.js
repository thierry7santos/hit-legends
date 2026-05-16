// backend/services/limitless/fetchLimitlessPairings.js

import axios from "axios";
import * as cheerio from "cheerio";

async function fetchRound(slug, round) {
  const url = `https://play.limitlesstcg.com/tournament/${slug}/pairings?round=${round}`;

  console.log("🎮 PAIRINGS:", url);

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const matches = [];

  $("table tbody tr").each((_, row) => {
    const cols = $(row).find("td");

    if (cols.length < 5) {
      return;
    }

    const table = $(cols[0]).text().trim();

    const player1Raw = $(cols[1]).text().replace(/\s+/g, " ").trim();

    const score1 = $(cols[2]).text().trim();

    const score2 = $(cols[3]).text().trim();

    const player2Raw = $(cols[4]).text().replace(/\s+/g, " ").trim();

    /* 🔥 REMOVE RECORD DOS NOMES */

    const player1 = player1Raw.replace(/\d+-\d+-\d+$/, "").trim();

    const player2 = player2Raw.replace(/\d+-\d+-\d+$/, "").trim();

    if (!player1 || !player2) {
      return;
    }

    matches.push({
      table,

      player1,

      player2,

      score: score1 && score2 ? `${score1}-${score2}` : "-",

      winner:
        Number(score1) > Number(score2)
          ? 1
          : Number(score2) > Number(score1)
            ? 2
            : null,
    });
  });

  return matches;
}

export async function fetchLimitlessPairings(slug) {
  const rounds = [];

  let currentRound = 1;

  while (true) {
    const matches = await fetchRound(slug, currentRound);

    if (!matches.length) {
      break;
    }

    rounds.push({
      round: `Round ${currentRound}`,

      finalized: currentRound < rounds.length,

      matches,
    });

    currentRound++;
  }

  /* 🔥 TODAS EXCETO A ÚLTIMA FINALIZADAS */

  rounds.forEach((round, index) => {
    round.finalized = index < rounds.length - 1;
  });

  console.log(`✅ Pairings rounds: ${rounds.length}`);

  return {
    currentRound: rounds.length,

    rounds,
  };
}
