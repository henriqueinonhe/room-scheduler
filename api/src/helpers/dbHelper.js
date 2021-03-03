import { User } from "../models/User.js";
import { db, ensureDbConnection } from "../db.js";

export function clearDb() {
  
}

export async function clearUsers() {
  await db.query("DELETE FROM Users WHERE 1 = 1");
  await db.query("ALTER TABLE Users AUTO_INCREMENT = 1");
}

export async function clearRooms() {
  await db.query("DELETE FROM Rooms WHERE 1 = 1");
  await db.query("ALTER TABLE Rooms AUTO_INCREMENT = 1");
}

export async function clearSessions() {
  await db.query("DELETE FROM Sessions WHERE 1 = 1");
  await db.query("ALTER TABLE Sessions AUTO_INCREMENT = 1");
}