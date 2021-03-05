import express from "express";
import { UsersController } from "../controllers/UsersController.js";
import { ScheduleController } from "../controllers/ScheduleController.js";

export const usersRouter = express.Router();

usersRouter.route("/")
  .get(UsersController.fetchUsers)
  .post(UsersController.createUser);

usersRouter.route("/:id")
  .get(UsersController.fetchSingleUser)
  .patch(UsersController.updateUser)
  .delete(UsersController.deleteUser);

usersRouter.get("/:id/schedule", ScheduleController.fetchUserSchedule);