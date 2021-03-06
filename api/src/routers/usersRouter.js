import express from "express";
import { UsersController } from "../controllers/UsersController.js";
import { ScheduleController } from "../controllers/ScheduleController.js";
import { authentication } from "../middlewares/authentication.js";

export const usersRouter = express.Router();

usersRouter.route("/")
  .get(authentication, UsersController.fetchUsers)
  .post(UsersController.createUser);

usersRouter.route("/:id")
  .get(authentication, UsersController.fetchSingleUser)
  .patch(authentication, UsersController.updateUser)
  .delete(authentication, UsersController.deleteUser);

usersRouter.get("/:id/schedule", ScheduleController.fetchUserSchedule);