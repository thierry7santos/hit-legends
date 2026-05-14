// backend/services/persistence/saveLiveTournament.js

import { supabase } from "../../config/supabaseClient.js";

export async function saveLiveTournament({
  slug,
  standings,
  pairings,
  bracket,
  finalized,
  format,
}) {
  const payload = {
    slug,

    standings: standings || [],

    pairings: pairings || [],

    bracket: bracket || null,

    finalized: finalized || false,

    format: format || "swiss_bracket",

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("tournaments_live").upsert(payload, {
    onConflict: "slug",
  });

  if (error) {
    console.error("❌ saveLiveTournament error", error);

    throw error;
  }
}
