import { User } from "../models/User.js";
import { db, ensureDbConnection } from "../db.js";

export function clearDb() {
  
}

export async function clearUsers() {
  await db.query("DELETE FROM Users WHERE 1 = 1");
}