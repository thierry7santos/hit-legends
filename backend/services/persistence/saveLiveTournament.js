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

    standings,

    pairings,

    bracket,

    finalized,

    format,

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("tournaments_live").upsert(payload, {
    onConflict: "slug",
  });

  if (error) {
    throw error;
  }
}
