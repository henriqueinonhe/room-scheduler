import express from "express";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";

export const allocationsRouter = express.Router();

allocationsRouter.use(authentication);

allocationsRouter.route("/")
  .get(authorization(["admin"]))
  .post(authorization(["admin", "common"]));

allocationsRouter.route("/:id")
  .get(authorization["admin", "common"])
  .delete(authorization["admin", "common"]);