import { supabase } from "../config/supabaseClient";

export async function getHomeData() {
  try {
    /* banners */

    const { data: banners, error: bannersError } = await supabase
      .from("banners")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (bannersError) {
      console.error("Erro banners:", bannersError);
    }

    /* campeões */

    const { data: champions, error: championsError } = await supabase
      .from("champions")
      .select("*")
      .limit(3);

    if (championsError) {
      console.error("Erro champions:", championsError);
    }

    /* ranking */

    const { data: ranking, error: rankingError } = await supabase
      .from("players")
      .select("*")
      .order("points", {
        ascending: false,
      })
      .limit(10);

    if (rankingError) {
      console.error("Erro ranking:", rankingError);
    }

    return {
      banners: banners || [],
      champions: champions || [],
      ranking: ranking || [],
    };
  } catch (error) {
    console.error("Erro Home:", error);

    return {
      banners: [],
      champions: [],
      ranking: [],
    };
  }
}
