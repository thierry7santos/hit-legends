import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchLimitlessPairings(slug, round = 1) {
  const url = `https://play.limitlesstcg.com/tournament/${slug}/pairings?round=${round}`;

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const pairings = [];

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

    const player1 = player1Raw.replace(/\d+-\d+-\d+$/, "").trim();

    const player2 = player2Raw.replace(/\d+-\d+-\d+$/, "").trim();

    pairings.push({
      table,

      player1,

      player2,

      score: `${score1}-${score2}`,

      winner:
        Number(score1) > Number(score2)
          ? 1
          : Number(score2) > Number(score1)
            ? 2
            : null,
    });
  });

  return pairings;
}
