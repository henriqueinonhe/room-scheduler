import express from "express";
import { AllocationsController } from "../controllers/AllocationsController.js";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";

export const allocationsRouter = express.Router();

allocationsRouter.use(authentication);

allocationsRouter.route("/")
  .get(authorization(["admin"]), AllocationsController.fetchAllocations)
  .post(authorization(["admin", "common"]), AllocationsController.createAllocation);

allocationsRouter.route("/:id")
  .get(authorization["admin", "common"], AllocationsController.fetchSingleAllocation)
  .delete(authorization["admin", "common"], AllocationsController.deleteAllocation);