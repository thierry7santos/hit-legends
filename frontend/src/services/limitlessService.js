// frontend/src/services/limitlessService.js

const API_URL = import.meta.env.VITE_API_URL;

/* 🏆 STANDINGS */

export async function getStandings(slug, signal) {
  const res = await fetch(`${API_URL}/api/limitless/${slug}/standings`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar standings");
  }

  return res.json();
}

/* 🔥 PAIRINGS */

export async function getPairings(slug, signal) {
  const res = await fetch(`${API_URL}/api/limitless/${slug}/pairings`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar pairings");
  }

  return res.json();
}

/* 🏆 BRACKET */

export async function getBracket(slug, format, signal) {
  const res = await fetch(
    `${API_URL}/api/limitless/${slug}/bracket?format=${format}`,
    { signal },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar bracket");
  }

  return res.json();
}
