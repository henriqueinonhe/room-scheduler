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


describe("Fetch Rooms", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("rooms", {
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

      await expect(request("rooms", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie
        }
      })).resolves.not.toThrow();

      //Admin User
      const response2 = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "admin",
          password: "dubbsdibbets"
        }
      });
      const sessionIdCookie2 = response2.headers["set-cookie"][0];

      await expect(request("rooms", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });
  });

  describe("Post Conditions", () => {
    test("No query", async () => {

    });

    test("Queries", async () => {

    });
  });
});

describe("Fetch Single Room", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("rooms/1", {
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

      await expect(request("rooms/1", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie
        }
      })).resolves.not.toThrow();

      //Admin User
      const response2 = await request("authentication/login", {
        method: "POST",
        json: {
          userName: "admin",
          password: "dubbsdibbets"
        }
      });
      const sessionIdCookie2 = response2.headers["set-cookie"][0];

      await expect(request("rooms/1", {
        method: "GET",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });

    test("Room not found", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Create Room", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("rooms", {
            method: "POST"
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
          await request("rooms", {
            method: "POST",
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

      await expect(request("rooms", {
        method: "POST",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });

    test("Name validation", async () => {

    });

    test("Duplicated room", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Update Room", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("rooms/1", {
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
          await request("rooms/1", {
            method: "POST",
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

      await expect(request("rooms/1", {
        method: "POST",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });

    test("Name validation", async () => {

    });

    test("Duplicated room", async () => {

    });
    
    test("Room not found", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Delete Room", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {
      await expect(async () => {
        try {
          await request("rooms/1", {
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
          await request("rooms/1", {
            method: "DELETE",
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

      await expect(request("rooms/1", {
        method: "DELETE",
        headers: {
          Cookie: sessionIdCookie2
        }
      })).resolves.not.toThrow();
    });

    test("Room not found", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });

    test("Cascade to allocations", async () => {

    });
  });
});
