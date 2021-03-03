import { clearSessions, clearUsers } from "../helpers/dbHelper.js";
import { Session } from "../models/Session.js";
import { User } from "../models/User.js";
import { ensureDbConnection, db } from "../db.js";

beforeAll(async () => {
  await ensureDbConnection();
});

afterAll(async () => {
  await db.close();
});

describe("Sanity checks", () => {
  afterEach(async () => {
    await clearSessions();
    await clearUsers();
  });

  test("Model constraints are respected", async () => {
    await expect(Session.create({})).rejects.toThrow();
  });

  test("Model is created correctly", async () => {
    await User.create({
      userName: "Dubbs",
      passwordHash: "34okij23n0nasdn023n490jasd",
      role: "admin"
    });

    await expect(Session.create({
      sessionId: "asdhasdao342909asd",
      fkUser: 1
    })).resolves.not.toThrow();

  });
});