export const tournamentData = {
  id: 1,
  name: "Copa Hit Legends",
  format: "single_elimination",

  bracket: {
    rounds: [
      {
        name: "Quartas",
        matches: [
          {
            id: "q1",
            player1: "Thierry",
            player2: "João",
            score: "2-1",
            winner: "Thierry",
            nextMatchId: "s1",
          },
          {
            id: "q2",
            player1: "Maria",
            player2: "Carlos",
            score: "0-2",
            winner: "Carlos",
            nextMatchId: "s1",
          },
        ],
      },
      {
        name: "Semi",
        matches: [
          {
            id: "s1",
            player1: "Thierry",
            player2: "Carlos",
            score: null,
            winner: null,
            nextMatchId: "f1",
          },
        ],
      },
      {
        name: "Final",
        matches: [
          {
            id: "f1",
            player1: "TBD",
            player2: "TBD",
            score: null,
            winner: null,
          },
        ],
      },
    ],
  },
};
