import { ValidationErrorEntry, ValidationError } from "../exceptions/ValidationError.js";
import { defaultVeryEarlyDate, defaultVeryLateDate } from "../helpers/dateHelper.js";
import { Room } from "../models/Room.js";
import Sequelize from "sequelize";
import { ResourceNotFoundError } from "../exceptions/ResourceNotFoundError.js";
import { controllerMethodWrapper } from "../helpers/controllerHelper.js";

const { Op } = Sequelize;

export class RoomsController {
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

  static fetchRooms = controllerMethodWrapper(async (req, res, next) => {
    const {
      name = "",
      createdAfter = defaultVeryEarlyDate,
      createdBefore = defaultVeryLateDate
    } = req.query;

    res.send(await Room.findAll({
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
    }));
  });

  static fetchSingleRoom = controllerMethodWrapper(async (req, res, next) => {
    const {
      id
    } = req.params;

    const room = await Room.findOne({
      where: { id }
    });

    if(!room) {
      throw new ResourceNotFoundError("There is no room associated with this id!", "RoomNotFoundError");
    }

    res.send(room);
  });

  static async createRoom(req, res, next) {
    try {
      const {
        name = ""
    } = req.body;

      const validationError = new ValidationError([]);
      validationError.addEntry(...await RoomsController.validateRoomName(name));

      if(validationError.hasErrors()) {
        throw validationError;
      }

      const room = await Room.create({
        name
      });

      res.send(room);
    }
    catch(error) {
      next(error);
      return;
    }
  }

  static updateRoom = controllerMethodWrapper(async (req, res, next) => {
    const {
      id
    } = req.params;

    const roomToBeUpdated = await Room.findOne({
      where: { id }
    });

    if(!roomToBeUpdated) {
      throw new ResourceNotFoundError("There is no room associated with this id!", "RoomNotFound");
    }

    const {
      name: receivedName
    } = req.body;

    const validationError = new ValidationError([]);

    const name = receivedName || roomToBeUpdated.name;
    validationError.addEntry(...await RoomsController.validateRoomName(receivedName));

    if(validationError.hasErrors()) {
      throw validationError;
    }

    roomToBeUpdated.name = name;

    await roomToBeUpdated.save();
    
    res.send(roomToBeUpdated);
  });

  static async deleteRoom(req, res, next) {
    //TODO
    next();
  }
}