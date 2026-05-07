export function propagateWinners(rounds) {
  const matchMap = {};

  // indexa todos matches
  rounds.forEach((round) => {
    round.matches.forEach((match) => {
      matchMap[match.id] = match;
    });
  });

  // propaga
  rounds.forEach((round) => {
    round.matches.forEach((match) => {
      if (match.winner && match.nextMatchId) {
        const next = matchMap[match.nextMatchId];

        if (!next.player1 || next.player1 === "TBD") {
          next.player1 = match.winner;
        } else {
          next.player2 = match.winner;
        }
      }
    });
  });

  return rounds;
}
