// backend/utils/isValidTournamentData.js

export function isValidTournamentData({ standings, pairings, bracket }) {
  /* 🏆 standings */

  const validStandings = Array.isArray(standings) && standings.length > 0;

  /* 🔥 pairings */

  const validPairings = pairings && Array.isArray(pairings.rounds);

  /* 🏆 bracket opcional */

  const validBracket = bracket === undefined || Array.isArray(bracket);

  return validStandings && validPairings && validBracket;
}
