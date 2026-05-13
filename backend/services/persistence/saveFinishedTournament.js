// backend/services/persistence/saveFinishedTournament.js

import { supabase } from "../../config/supabaseClient.js";

export async function saveFinishedTournament({
  slug,
  standings,
  pairings,
  bracket,
}) {
  const payload = {
    slug,

    standings,

    pairings,

    bracket,

    finalized: true,

    finished_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("tournaments_history").insert(payload);

  if (error) {
    throw error;
  }
}
