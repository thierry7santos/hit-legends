// backend/routes/limitlessRoutes.js

import express from "express";

import {
  getStandings,
  getPairings,
  getBracket,
} from "../controllers/limitlessController.js";

const router = express.Router();

/* 🏆 STANDINGS */

router.get("/:slug/standings", getStandings);

/* ⚔️ PAIRINGS */

router.get("/:slug/pairings", getPairings);

/* 🧩 BRACKET */

router.get("/:slug/bracket", getBracket);

export default router;
