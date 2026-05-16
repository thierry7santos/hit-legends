export function detectTournamentChanges(oldData, newData) {
  const events = [];

  /* ❌ NO OLD DATA */

  if (!oldData) {
    return events;
  }

  /* 🔥 ROUND STARTED */

  const oldRound = oldData?.pairings?.currentRound || 0;

  const newRound = newData?.pairings?.currentRound || 0;

  if (newRound > oldRound) {
    events.push({
      type: "ROUND_STARTED",

      round: newRound,
    });
  }

  /* 🏁 TOURNAMENT FINISHED */

  if (!oldData.finalized && newData.finalized) {
    events.push({
      type: "TOURNAMENT_FINISHED",
    });
  }

  /* 🎮 MATCH RESULTS */

  const oldRounds = oldData?.pairings?.rounds || [];

  const newRounds = newData?.pairings?.rounds || [];

  for (let r = 0; r < newRounds.length; r++) {
    const oldMatches = oldRounds[r]?.matches || [];

    const newMatches = newRounds[r]?.matches || [];

    for (let i = 0; i < newMatches.length; i++) {
      const oldMatch = oldMatches[i];

      const newMatch = newMatches[i];

      if (!newMatch) {
        continue;
      }

      const oldScore = oldMatch?.score || "";

      const newScore = newMatch?.score || "";

      /* 🎯 SCORE UPDATED */

      if (oldScore !== newScore && newScore !== "0-0") {
        events.push({
          type: "MATCH_RESULT",

          round: newRounds[r].round,

          table: newMatch.table,

          player1: newMatch.player1,

          player2: newMatch.player2,

          score: newMatch.score,

          winner: newMatch.winner,
        });
      }
    }
  }

  return events;
}
