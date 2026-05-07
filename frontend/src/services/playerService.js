import { supabase } from "../config/supabaseClient";

export async function getMyProfile() {
  /* auth */

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  /* procura profile */

  let { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  /* cria se não existir */

  if (!data) {
    const nickname =
      user.user_metadata?.nickname || user.email?.split("@")[0] || "Jogador";

    const { data: created, error: createError } = await supabase
      .from("players")
      .insert({
        id: user.id,

        email: user.email,

        nickname,

        phone_number: user.user_metadata?.phone_number || null,

        matches: 0,
        wins: 0,
        points: 0,
      })
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    data = created;
  }

  return data;
}
