import * as cheerio from "cheerio";

export function parseStandings(html) {
  const $ = cheerio.load(html);

  const standings = [];

  const rows = $("table tbody tr");

  rows.each((_, row) => {
    const cols = $(row).find("td");

    if (cols.length < 5) return;

    const rank = $(cols[0]).text().trim();

    const player = $(cols[1]).text().trim();

    const record = $(cols[2]).text().trim();

    const points = $(cols[3]).text().trim();

    const omw = $(cols[4]).text().trim();

    const [wins, losses, ties] = record.split("-").map(Number);

    standings.push({
      rank: Number(rank),
      player,
      wins: wins || 0,
      losses: losses || 0,
      ties: ties || 0,
      points: Number(points) || 0,
      omw,
    });
  });

  return standings;
}
