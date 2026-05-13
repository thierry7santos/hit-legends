const tournamentCache = {};

/**
 * Estrutura:
 *
 * {
 *   [slug]: {
 *
 *     standings: [],
 *
 *     pairings: {
 *       currentRound: 1,
 *       rounds: [],
 *     },
 *
 *     bracket: [],
 *
 *     updatedAt: number,
 *
 *     finalized: boolean,
 *
 *     format: string,
 *
 *     isFetching: boolean,
 *   }
 * }
 */

export default tournamentCache;
