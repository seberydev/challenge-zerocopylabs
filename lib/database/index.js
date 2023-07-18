import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

let db;

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "..", "data", "database");

const defaultFile = join(dataPath, "default.json");
const dbFile = join(dataPath, "db.json");

export const createConnection = async () => {
  const adapter = new JSONFile(dbFile);

  const rawdata = fs.readFileSync(defaultFile);
  const defaultData = JSON.parse(rawdata);

  db = new Low(adapter, defaultData);

  await db.read();
  await db.write();
};

export const getDB = () => db;
