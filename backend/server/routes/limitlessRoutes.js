import express from "express";
import { getFullBracket } from "../services/limitlessService.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const players = Number(req.query.players || 32);

  try {
    const data = await getFullBracket(id, players);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar Limitless" });
  }
});

export default router;
