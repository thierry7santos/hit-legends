// backend/utils/isValidTournamentData.js

export function isValidTournamentData({ standings, pairings, bracket }) {
  const validStandings = Array.isArray(standings);

  const validPairings = Array.isArray(pairings);

  const validBracket = bracket !== undefined;

  return validStandings && validPairings && validBracket;
}
