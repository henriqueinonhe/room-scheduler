import express from "express";
import { UsersController } from "../controllers/UsersController.js";
import { ScheduleController } from "../controllers/ScheduleController.js";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";

export const usersRouter = express.Router();

usersRouter.route("/")
  .get(authentication, authorization(["admin"]), UsersController.fetchUsers)
  .post(UsersController.createUser);

usersRouter.route("/:id")
  .get(authentication, authorization(["admin"]), UsersController.fetchSingleUser)
  .patch(authentication, authorization(["admin"]), UsersController.updateUser)
  .delete(authentication, authorization(["admin"]), UsersController.deleteUser);

usersRouter.get("/:id/schedule", authorization(["admin", "common"]), ScheduleController.fetchUserSchedule);