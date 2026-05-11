// backend/utils/checkIfFinished.js

export function checkIfFinished(matches) {
  if (!Array.isArray(matches)) return false;

  return matches.every((match) => {
    return match.state === "DONE" && match.nextMatchId === null;
  });
}
