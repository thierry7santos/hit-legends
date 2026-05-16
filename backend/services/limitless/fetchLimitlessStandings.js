// backend/services/limitless/fetchLimitlessStandings.js

import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchLimitlessStandings(slug) {
  const url = `https://play.limitlesstcg.com/tournament/${slug}/standings`;

  console.log("📊 STANDINGS:", url);

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const standings = [];

  $("table tbody tr").each((_, row) => {
    const cols = $(row).find("td");

    if (cols.length < 4) {
      return;
    }

    const rank = $(cols[0]).text().trim();

    const name = $(cols[1]).text().replace(/\s+/g, " ").trim();

    const points = $(cols[2]).text().trim();

    const record = $(cols[3]).text().trim();

    if (!name) {
      return;
    }

    standings.push({
      rank: Number(rank) || standings.length + 1,

      name,

      points: Number(points) || 0,

      record,
    });
  });

  console.log(`✅ Standings parsed: ${standings.length}`);

  return standings;
}
