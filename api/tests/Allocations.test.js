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

describe("Fetch Allocations", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {

    });

    test("Check authorization", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("No query", async () => {

    });

    test("Query with room id and no user id", async () => {

    });

    test("Query with user id and no room id", async () => {

    });

    test("Query with names and no ids", async () => {

    });

    test("Queries with everything", async () => {

    });
  });
});

describe("Fetch Single Allocation", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {

    });

    test("Check authorization", async () => {

    });

    test("Allocation not found", async () => {

    })
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Create Allocation", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {

    });

    test("Check authorization", async () => {

    });

    test("Single user, multiple allocations at the same start date", async () => {

    });

    test("Single room, multiple allocations at the same start date", async () => {

    });

    test("Different users, allocations at the same room and start date", async () => {

    });

    test("Start date validation", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Delete Allocation", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {

    });

    test("Check authorization", async () => {

    });

    test("Allocation not found", async () => {
      
    })
  });

  describe("Post Conditions", () => {
    test("Happy path", () => {

    });
  });
});

describe("Fetch User Allocations", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {

    });

    test("Check authorization", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});

describe("Fetch Room Allocations", () => {
  describe("Pre Conditions", () => {
    test("Check authentication", async () => {

    });

    test("Check authorization", async () => {

    });
  });

  describe("Post Conditions", () => {
    test("Happy path", async () => {

    });
  });
});