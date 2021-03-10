import { db } from "../src/db.js";

async function clearUsers() {
  await db.query("DELETE FROM Users WHERE 1 = 1");
  await db.query("ALTER TABLE Users AUTO_INCREMENT = 1");
}

async function clearRooms() {
  await db.query("DELETE FROM Rooms WHERE 1 = 1");
  await db.query("ALTER TABLE Rooms AUTO_INCREMENT = 1");
}

async function clearSessions() {
  await db.query("DELETE FROM Sessions WHERE 1 = 1");
  await db.query("ALTER TABLE Sessions AUTO_INCREMENT = 1");
}

async function clearAllocations() {
  await db.query("DELETE FROM Allocations WHERE 1 = 1");
  await db.query("ALTER TABLE Allocations AUTO_INCREMENT = 1");
}

async function main() {
  await clearAllocations();
  await clearSessions();
  await clearRooms();
  await clearUsers();
}

main();