import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "../utils/utils.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artFile = path.join(__dirname, "../database/art.json");


const storage = multer.memoryStorage();
const upload = multer({ storage });

process.env.JWT_SECRET


const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password";  


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, { expiresIn: "2h" });

  res.json({ token });
});


router.post("/upload", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, blurb } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Image file missing" });
    }

    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const arts = await readJSON(artFile);
    arts.push({ title, image: base64Image, blurb });

    await writeJSON(artFile, arts);

    res.json({ message: "Artwork uploaded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload artwork" });
  }
});

export default router;
