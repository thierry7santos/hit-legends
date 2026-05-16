import tournamentCache from "../cache/tournamentCache.js";

export async function registerTournament(req, res) {
  try {
    const { slug, format = "swiss_bracket" } = req.body;

    if (!slug) {
      return res.status(400).json({
        error: "Missing slug",
      });
    }

    /* ✅ EXISTS */

    if (tournamentCache[slug]) {
      return res.json({
        success: true,

        cached: true,
      });
    }

    /* 🚀 REGISTER */

    tournamentCache[slug] = {
      standings: [],

      pairings: {
        currentRound: 0,

        rounds: [],
      },

      bracket: [],

      updatedAt: 0,

      finalized: false,

      format,

      isFetching: false,
    };

    console.log(`📝 Registered ${slug}`);

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to register tournament",
    });
  }
}
