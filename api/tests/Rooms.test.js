import { clearDb } from "../scripts/clearDb.js";
import { seedDb } from "../scripts/seedDb.js";
import { client } from "./APIClient.js";

beforeEach(async () => {
  await clearDb();
  await seedDb();
});

afterAll(async () => {
  await clearDb();
});


describe("Fetch Rooms", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {

    });

    test("Check authorization", async () => {

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

    });

    test("Check authorization", async () => {

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

    });

    test("Check authorization", async () => {

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

    });

    test("Check authorization", async () => {

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

    });

    test("Check authorization", async () => {

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
