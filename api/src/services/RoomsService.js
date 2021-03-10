import { Room } from "../models/Room.js";
import { ValidationError, ValidationErrorEntry } from "../exceptions/ValidationError.js";
import Sequelize from "sequelize";
import { defaultVeryEarlyDate, defaultVeryLateDate } from "../helpers/dateHelper.js";
import { ResourceNotFoundError } from "../exceptions/ResourceNotFoundError.js";
import { paginate } from "../helpers/paginationHelper.js";

const { Op } = Sequelize;

export class RoomsService {
  static resultsPerPage = 20;

  static async validateRoomName(name) {
    const errors = [];

    if(name.length === "") {
      errors.push(new ValidationErrorEntry("Room name cannot be empty!", "RoomNameEmpty"));
    }

    if(name.length > 30) {
      errors.push(new ValidationErrorEntry("Room name cannot be greater than 30 charaters!", "RoomNameTooLong"));
    }

    if(!/^([A-z]|[0-9]|\s)+$/.test(name)) {
      errors.push(new ValidationErrorEntry("Room name must be composed of letters, numbers and spaces only!", "RoomNameCharactersNotAllowed"));
    }

    if(errors.length !== 0) {
      return errors;
    }

    const roomsWithThisName = await Room.findAll({
      where: {
        name
      }
    });

    if(roomsWithThisName.length !== 0) {
      errors.push(new ValidationErrorEntry("There is already a room with this name!", "DuplicateRoomName"));
    }

    return errors;
  }

  static async fetchRooms(query) {
    const {
      name = "",
      createdAfter = defaultVeryEarlyDate,
      createdBefore = defaultVeryLateDate,
      page = 1
    } = query;

    return await paginate({
      model: Room,
      queryConfig: {
        where: {
          name: {
            [Op.like]: `%${name}%`
          },
          createdAt: {
            [Op.between]: [
              createdAfter,
              createdBefore
            ]
          }
        }
      },
      resultsPerPage: RoomsService.resultsPerPage,
      page
    });
  }

  static async fetchSingleRoom(id) {
    const fetchedRoom = await Room.findOne({
      where: { id }
    });

    if(!fetchedRoom) {
      throw new ResourceNotFoundError("There is no room associated with this id!", "RoomNotFoundError");
    }

    return fetchedRoom;
  }

  static async createRoom(createRoomData) {
    const {
      name
    } = createRoomData;

    const trimmedName = name.trim();
    const validationError = new ValidationError([]);
    validationError.addEntry(...await RoomsService.validateRoomName(trimmedName));

    if(validationError.hasErrors()) {
      throw validationError;
    }

    const createdRoom = await Room.create({
      name: trimmedName
    });

    return createdRoom;
  }

  static async updateRoom(id, updateRoomData) {
    const updatedRoom = await RoomsService.fetchSingleRoom(id);
    const {
      name: receivedName
    } = updateRoomData;

    const validationError = new ValidationError([]);

    const name = receivedName || updatedRoom.name;
    validationError.addEntry(...await RoomsController.validateRoomName(receivedName));

    if(validationError.hasErrors()) {
      throw validationError;
    }

    updatedRoom.name = name;
    await updatedRoom.save();

    return updatedRoom;
  }

  static async deleteRoom(id) {
    const deletedRoom = await RoomsService.fetchSingleRoom(id);
    await deletedRoom.destroy();
    return deletedRoom;
  }
}