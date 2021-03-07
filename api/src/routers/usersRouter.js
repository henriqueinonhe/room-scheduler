import express from "express";
import { UsersController } from "../controllers/UsersController.js";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";

export const usersRouter = express.Router();

usersRouter.use(authentication);

usersRouter.route("/")
  .get(authorization(["admin"]), UsersController.fetchUsers)
  .post(UsersController.createUser);

usersRouter.route("/:id")
  .get(authorization(["admin"]), UsersController.fetchSingleUser)
  .patch(authorization(["admin"]), UsersController.updateUser)
  .delete(authorization(["admin"]), UsersController.deleteUser);

usersRouter.get("/:id/allocations", authorization(["admin", "common"]));