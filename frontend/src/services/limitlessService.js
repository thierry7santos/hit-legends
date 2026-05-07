export async function getStandings(slug) {
  const res = await fetch(`/api/limitless/${slug}/standings`);

  if (!res.ok) {
    throw new Error("Erro ao buscar standings");
  }

  return res.json();
}

/* 🔥 PAIRINGS */

export async function getPairings(slug, round = 1) {
  const res = await fetch(`/api/limitless/${slug}/pairings?round=${round}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar pairings");
  }

  return res.json();
}

/* 🏆 BRACKET */

export async function getBracket(slug, players = 32) {
  const res = await fetch(`/api/limitless/${slug}/bracket?players=${players}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar bracket");
  }

  return res.json();
}
