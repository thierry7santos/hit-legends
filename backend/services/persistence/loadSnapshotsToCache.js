// backend/services/persistence/loadSnapshotsToCache.js

import { supabase } from "../../config/supabaseClient.js";

import tournamentCache from "../../cache/tournamentCache.js";

export async function loadSnapshotsToCache() {
  try {
    console.log("💾 Loading snapshots from Supabase...");

    const { data, error } = await supabase.from("tournaments_live").select("*");

    if (error) {
      throw error;
    }

    for (const tournament of data) {
      tournamentCache[tournament.slug] = {
        standings: tournament.standings,

        pairings: tournament.pairings,

        bracket: tournament.bracket,

        updatedAt: tournament.updated_at,

        finalized: tournament.finalized,

        format: tournament.format,
      };

      console.log(`✅ Loaded ${tournament.slug}`);
    }

    console.log("🚀 Snapshots loaded");
  } catch (err) {
    console.error("❌ Error loading snapshots:", err);
  }
}
