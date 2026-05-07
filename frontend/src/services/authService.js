import { supabase } from "../config/supabaseClient";

/* LOGIN */

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

/* REGISTER */

export async function register(email, password, phone_number, nickname) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        nickname,
        phone_number,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
