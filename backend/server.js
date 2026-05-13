// backend/server.js

import "dotenv/config";

import express from "express";
import cors from "cors";

import limitlessRoutes from "./routes/limitlessRoutes.js";

import { startLimitlessWorker } from "./workers/limitlessWorker.js";
import { loadSnapshotsToCache } from "./services/persistence/loadSnapshotsToCache.js";

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

app.listen(PORT, async () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);

  try {
    await loadSnapshotsToCache();
  } catch (err) {
    console.error(err);
  }

  startLimitlessWorker();
});
