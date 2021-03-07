import express from "express";
import { RoomsController } from "../controllers/RoomsController.js";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";

export const roomsRouter = express.Router();

roomsRouter.use(authentication);

roomsRouter.route("/")
  .get(authorization(["admin", "common"]), RoomsController.fetchRooms)
  .post(authorization(["admin"]), RoomsController.createRoom);

roomsRouter.route("/:id")
  .get(authorization(["admin", "common"]), RoomsController.fetchSingleRoom)
  .patch(authorization(["admin"]), RoomsController.updateRoom)
  .delete(authorization(["admin"]), RoomsController.deleteRoom);

roomsRouter.get("/:id/allocations", authorization(["admin", "common"]));