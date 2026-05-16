import { supabase } from "../../config/supabaseClient.js";

export async function saveTournamentEvent({ slug, type, payload = {} }) {
  const { error } = await supabase.from("tournament_events").insert({
    tournament_slug: slug,

    event_type: type,

    payload,
  });

  if (error) {
    console.error("❌ saveTournamentEvent error", error);
  }
}
