import { clearDb } from "../scripts/clearDb.js";
import { seedDb } from "../scripts/seedDb.js";
import { db } from "../src/db.js";
import { request } from "./APIClient.js";

beforeEach(async () => {
  await clearDb();
  await seedDb();
});

afterAll(async () => {
  await clearDb();
  await db.close();
});

describe("Login", () => {
  describe("Pre Conditions", () => {
    test("Empty field", async () => {
      await expect(async () => {
        try {
          await request("authentication/login", {
            method: "POST"
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            code: error.response.body.error.code
          };
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        code: "LoginFail"
      });
    }); 

    test("Non existent user", async () => {
      await expect(async () => {
        try {
          await request("authentication/login", {
            method: "POST",
            json: {
              userName: "Dobbs",
              password: "psychosweetrollsbush"
            }
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            code: error.response.body.error.code
          };
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        code: "LoginFail"
      });
    });

    test("Wrong password", async () => {
      await expect(async () => {
        try {
          await request("authentication/login", {
            method: "POST",
            json: {
              userName: "psychosweetrollsbush",
              password: "adasdasd"
            }
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            code: error.response.body.error.code
          };
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        code: "LoginFail"
      });
    });
  });

  describe("Post Conditions", () => {
    test("Login successful", async () => {

      const response = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "psychosweetrollsbush",
          password: "psychosweetrollsbush"
        }
      });

      expect(response.headers["set-cookie"][0]).toMatch(/^sessionId=.+$/);
      expect(response.body).toMatchObject({
        userName: "psychosweetrollsbush",
        role: "common",
        createdAt: expect.any(String)
      });
    });
  });
});

describe("Logout", () => {
  describe("Pre Conditions", () => {
    test("Logout without being logged in", async () => {
      await expect(async () => {
        try {
          await request("authentication/logout", {
            method: "GET"
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            code: error.response.body.error.code
          };
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        code: "AnonymousUser"
      });
    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {
      const response = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "psychosweetrollsbush",
          password: "psychosweetrollsbush"
        }
      });

      const sessionIdCookie = response.headers["set-cookie"][0];
      const response2 = await request("authentication/logout", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie
        }
      });

      expect(response2.headers["set-cookie"][0]).toMatch(/^sessionId=.*Max-Age=0/);

      await expect(async () => {
        try {
          await request("rooms", {
            method: "GET"
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            code: error.response.body.error.code
          };
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        code: "AnonymousUser"
      });
    });
  });
});