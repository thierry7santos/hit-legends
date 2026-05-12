import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchLimitlessStandings(slug) {
  const url = `https://play.limitlesstcg.com/tournament/${slug}/standings`;

  const { data: html } = await axios.get(url);

  const $ = cheerio.load(html);

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

    standings.push({
      rank,
      name,
      points,
      record,
    });
  });

  return standings;
}
