import express from "express";
import { RoomsController } from "../controllers/RoomsController";

export const roomsRouter = express.Router();

roomsRouter.route("/rooms")
  .get(RoomsController.fetchRooms)
  .post(RoomsController.createRoom);

roomsRouter.route("/rooms/:id")
  .get(RoomsController.fetchSingleRoom)
  .patch(RoomsController.updateRoom)
  .delete(RoomsController.deleteRoom);