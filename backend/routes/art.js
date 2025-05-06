import express from "express";
const router=express();


import { readJSON, writeJSON } from "../utils/utils.js";


import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const artFile = path.join(__dirname, "../database/art.json")


router.get("/", async (req, res) => {
    try {
      const arts = await readJSON(artFile);
      res.json(arts);
    } catch (err) {
      console.error("GET /arts error:", err.message);
      res.status(500).json({ error: "Failed to load art work" });
    }
  });

  export default router;