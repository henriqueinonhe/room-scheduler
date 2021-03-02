import { clearUsers } from "../helpers/dbHelper.js";
import { User } from "../models/User.js";
import { ensureDbConnection, db } from "../db.js";

beforeAll(async () => {
  await ensureDbConnection();
});

afterAll(async () => {
  await db.close();
});

describe("Sanity checks", () => {
  afterEach(() => {
    return clearUsers();
  });

  test("Model constraints are respected", async () => {
    await expect(User.create({})).rejects.toThrow();
  });

  test("Model is created correctly", async () => {
    await expect(User.create({
      userName: "Dubbs",
      passwordHash: "34okij23n0nasdn023n490jasd",
      role: "admin"
    })).resolves.not.toThrow();
  });
});