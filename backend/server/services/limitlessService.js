import { parseHTML, parseJSON } from "../parsers/limitlessParser.js";

export async function fetchLimitlessRound(id, round) {
  const url = `https://play.limitlesstcg.com/tournament/${id}/pairings?round=${round}`;

  const res = await fetch(url);
  const text = await res.text();

  try {
    return parseJSON(JSON.parse(text), round);
  } catch {
    return parseHTML(text, round);
  }
}

export async function getFullBracket(id, players) {
  const rounds = [];
  const totalRounds = Math.log2(players);

  for (let i = 1; i <= totalRounds; i++) {
    const round = await fetchLimitlessRound(id, i);
    rounds.push(round);
  }

  return rounds;
}
