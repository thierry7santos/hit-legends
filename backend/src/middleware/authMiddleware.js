import { createClient } from "@supabase/supabase-js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Token não fornecido");
    }

    // cria um client COM o token do usuário
    const supabaseUser = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabaseUser.auth.getUser();

    if (error || !user) {
      throw new Error("Token inválido");
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      data: null,
      error: err.message,
    });
  }
}
