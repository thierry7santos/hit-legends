// backend/routes/limitlessRoutes.js

import express from "express";

import {
  getStandings,
  getPairings,
  getBracket,
} from "../controllers/limitlessController.js";

import { runCron } from "../controllers/cronController.js";

import { registerTournament } from "../controllers/registerTournamentController.js";

const router = express.Router();

/* 🏆 REGISTER */

router.post("/register", registerTournament);

/* 🔄 CRON */

router.get("/cron", runCron);

/* 🏆 STANDINGS */

router.get("/:slug/standings", getStandings);

/* ⚔️ PAIRINGS */

router.get("/:slug/pairings", getPairings);

/* 🧩 BRACKET */

router.get("/:slug/bracket", getBracket);

export default router;
