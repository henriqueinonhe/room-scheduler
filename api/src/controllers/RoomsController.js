import { controllerMethodWrapper } from "../helpers/controllerHelper.js";
import { RoomsService } from "../services/RoomsService.js";

export class RoomsController {
  static fetchRooms = controllerMethodWrapper(async (req, res, next) => {
    const query = req.query;
    const fetchedRooms = await RoomsService.fetchRooms(query);
    res.send(fetchedRooms);
  });

  static fetchSingleRoom = controllerMethodWrapper(async (req, res, next) => {
    const {
      id
    } = req.params;
    const fetchedRoom = await RoomsService.fetchSingleRoom(id);
    res.send(fetchedRoom);
  });

  static createRoom = controllerMethodWrapper(async (req, res, next) => {
    const createRoomData = req.body;
    const createdRoom = await RoomsService.createRoom(createRoomData);
    res.send(createdRoom);
  });

  static updateRoom = controllerMethodWrapper(async (req, res, next) => {
    const {
      id
    } = req.params;
    const updatedRoomData = req.body;
    const updatedRoom = await RoomsService.updateRoom(id, updatedRoomData);
    res.send(updatedRoom);
  });

  static async deleteRoom(req, res, next) {
    const { id } = req.params;
    const deletedRoom = await RoomsService.deleteRoom(id);
    res.send(deletedRoom);
  }
}