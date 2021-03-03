import { clearRooms } from "../helpers/dbHelper.js";
import { ensureDbConnection, db } from "../db.js";
import { Room } from "../models/Room.js";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  await ensureDbConnection();
});

afterAll(async () => {
  await db.close();
});

describe("Sanity checks", () => {
  afterEach(() => {
    return clearRooms();
  });

  test("Model constraints are respected", async () => {
    await expect(Room.create({})).rejects.toThrow();
  });

  test("Model is created correctly", async () => {
    await expect(Room.create({
      name: "Sala 41"
    })).resolves.not.toThrow();
  });
});