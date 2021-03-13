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


describe("Fetch Users", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("users", {
            method: "GET"
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        errorCode: "AnonymousUser"
      });
    });

    test("Check authorization", async () => {
      //Common User
      const response = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "psychosweetrollsbush",
          password: "psychosweetrollsbush"
        }
      });
      const sessionIdCookie = response.headers["set-cookie"][0];

      await expect(async () => {
        try {
          await request("users", {
            method: "GET",
            headers: {
              Cookie: sessionIdCookie
            }
          })
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 403,
        errorCode: "Unauthorized"
      });

      //Admin User
      const response2 = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "admin",
          password: "dubbsdibbets"
        }
      });
      const sessionIdCookie2 = response2.headers["set-cookie"][0];

      await expect(request("users", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });
  });

  describe("Post Conditions", () => {
    test("Empty query", async () => {

    });

    test("Queries", async () => {

    });
  });
});

describe("Fetch Single User", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("users/1", {
            method: "GET"
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        errorCode: "AnonymousUser"
      });
    });

    test("Check authorization", async () => {
      //Common User
      const response = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "psychosweetrollsbush",
          password: "psychosweetrollsbush"
        }
      });
      const sessionIdCookie = response.headers["set-cookie"][0];

      await expect(async () => {
        try {
          await request("users", {
            method: "GET",
            headers: {
              Cookie: sessionIdCookie
            }
          })
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 403,
        errorCode: "Unauthorized"
      });

      //Admin User
      const response2 = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "admin",
          password: "dubbsdibbets"
        }
      });
      const sessionIdCookie2 = response2.headers["set-cookie"][0];

      await expect(request("users", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });

    test("User not found", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Create User", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(request("users", {
          method: "POST",
          json: {
            userName: "dubbsdibbets",
            password: "dubbsdibbets"
          }
        })).resolves.not.toThrow();
    });

    test("User Name constraints", async () => {

    });

    test("Password constraints", async () => {

    });

    test("Duplicate user", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Update User", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("users/1", {
            method: "PATCH"
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        errorCode: "AnonymousUser"
      });
    });

    test("Check authorization", async () => {
      //Common User
      const response = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "psychosweetrollsbush",
          password: "psychosweetrollsbush"
        }
      });
      const sessionIdCookie = response.headers["set-cookie"][0];

      await expect(async () => {
        try {
          await request("users", {
            method: "GET",
            headers: {
              Cookie: sessionIdCookie
            }
          })
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 403,
        errorCode: "Unauthorized"
      });

      //Admin User
      const response2 = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "admin",
          password: "dubbsdibbets"
        }
      });
      const sessionIdCookie2 = response2.headers["set-cookie"][0];

      await expect(request("users", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });

    test("User Name constraints", async () => {

    });

    test("Password constraints", async () => {

    });

    test("Duplicate user", async () => {

    });

    test("User not found", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Delete User", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("users/1", {
            method: "DELETE"
          });
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 401,
        errorCode: "AnonymousUser"
      });
    });

    test("Check authorization", async () => {
      //Common User
      const response = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "psychosweetrollsbush",
          password: "psychosweetrollsbush"
        }
      });
      const sessionIdCookie = response.headers["set-cookie"][0];

      await expect(async () => {
        try {
          await request("users", {
            method: "GET",
            headers: {
              Cookie: sessionIdCookie
            }
          })
        }
        catch(error) {
          throw {
            statusCode: error.response.statusCode,
            errorCode: error.response.body.error.code
          }
        }
      }).rejects.toStrictEqual({
        statusCode: 403,
        errorCode: "Unauthorized"
      });

      //Admin User
      const response2 = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "admin",
          password: "dubbsdibbets"
        }
      });
      const sessionIdCookie2 = response2.headers["set-cookie"][0];

      await expect(request("users", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });

    test("User not found", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });

    test("Cascade to allocations", async () => {

    });

    test("Cascade to sessions", async () => {

    });
  });
});