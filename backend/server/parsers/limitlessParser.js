import cheerio from "cheerio";

export async function fetchLimitlessRound(tournamentId, round) {
  const url = `https://play.limitlesstcg.com/tournament/${tournamentId}/pairings?round=${round}`;

  const response = await fetch(url);
  const text = await response.text();

  // tenta JSON primeiro
  try {
    const json = JSON.parse(text);
    return parseJSON(json, round);
  } catch {
    return parseHTML(text, round);
  }
}
