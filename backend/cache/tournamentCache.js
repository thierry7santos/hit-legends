// backend/cache/tournamentCache.js

const tournamentCache = {};

/**
 * Estrutura:
 * {
 *   [slug]: {
 *     data: [],
 *     lastUpdate: number,
 *     finalized: boolean
 *   }
 * }
 */

export default tournamentCache;
