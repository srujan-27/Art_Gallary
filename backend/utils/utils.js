import { promises as fs } from "fs";

//  Read JSON file
export async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Failed to read ${filePath}: ${err.message}`);
  }
}

// Write JSON file
export async function writeJSON(filePath, jsonData) {
  try {
    const json = JSON.stringify(jsonData, null, 2);
    await fs.writeFile(filePath, json, "utf-8");
  } catch (err) {
    throw new Error(`Failed to write ${filePath}: ${err.message}`);
  }
}
