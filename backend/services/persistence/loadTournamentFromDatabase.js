import { supabase } from "../../config/supabaseClient.js";

export async function loadTournamentFromDatabase(slug) {
  const { data, error } = await supabase
    .from("tournaments_live")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("❌ loadTournamentFromDatabase", error);

    return null;
  }

  return {
    standings: data.standings,

    pairings: data.pairings,

    bracket: data.bracket,

    updatedAt: data.updated_at,

    finalized: data.finalized,

    format: data.format,
  };
}
