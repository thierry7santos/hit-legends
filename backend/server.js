import "dotenv/config";

import express from "express";
import cors from "cors";

import limitlessRoutes from "./routes/limitlessRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

/* 🔥 LIMITLESS */

app.use("/api/limitless", limitlessRoutes);

/* ROOT */

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

/* SERVER */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
