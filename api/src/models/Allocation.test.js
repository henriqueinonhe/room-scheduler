import { clearDb } from "../helpers/dbHelper.js";
import { ensureDbConnection, db } from "../db.js";
import { Allocation } from "../models/Allocation.js";
import { User } from "./User.js";
import { Room } from "./Room.js";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  await ensureDbConnection();
});

afterAll(async () => {
  await db.close();
});

describe("Sanity checks", () => {
  afterEach(async () => {
    await clearDb();
  });

  test("Model constraints are respected", async () => {
    await expect(Allocation.create({})).rejects.toThrow();
  });

  test("Model is created correctly", async () => {
    await User.create({
      userName: "Duubbs",
      passwordHash: "aojasduas d9u90d 23jasd",
      role: "common"
    });

    await Room.create({
      name: "Sala 42"
    });

    await expect(Allocation.create({
      fkUser: 1,
      fkRoom: 1,
      startDate: "2021-03-04T02:12:07.357Z",
      endDate: "2021-03-04T02:12:07.357Z"
    })).resolves.not.toThrow();
  });
});