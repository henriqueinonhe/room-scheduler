import express from "express";
import { UsersController } from "../controllers/UsersController";

export const usersRouter = express.Router();

usersRouter.route("/users")
  .get(UsersController.fetchUsers)
  .post(UsersController.createUser);

usersRouter.route("/users/:id")
  .get(UsersController.fetchSingleUser)
  .patch(UsersController.updateUser)
  .delete(UsersController.deleteUser);