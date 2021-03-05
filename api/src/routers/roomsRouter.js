import express from "express";
import { RoomsController } from "../controllers/RoomsController.js";
import { ScheduleController } from "../controllers/ScheduleController.js";

export const roomsRouter = express.Router();

roomsRouter.route("/")
  .get(RoomsController.fetchRooms)
  .post(RoomsController.createRoom);

roomsRouter.route("/:id")
  .get(RoomsController.fetchSingleRoom)
  .patch(RoomsController.updateRoom)
  .delete(RoomsController.deleteRoom);

roomsRouter.get("/:id/schedule", ScheduleController.fetchRoomSchedule);