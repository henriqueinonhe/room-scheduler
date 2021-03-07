import { Allocation } from "../models/Allocation.js";
import { ResourceNotFoundError } from "../exceptions/ResourceNotFoundError.js";
import { ValidationError, ValidationErrorEntry } from "../exceptions/ValidationError.js";
import { RoomsService } from "./RoomsService.js";
import { UsersService } from "./UsersService.js"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import Sequelize from "sequelize";
import { defaultVeryEarlyDate, defaultVeryLateDate } from "../helpers/dateHelper.js";

const { Op } = Sequelize;

dayjs.extend(customParseFormat);

export class AllocationsService {
  static async fetchAllocations(query) {
    const {
      userId,
      roomId,
      startDateAfter = defaultVeryEarlyDate,
      startDateBefore = defaultVeryLateDate
    } = query;

    const whereObject = {
      fkUser: userId,
      fkRoom: roomId,
      startDate: {
        [Op.between]: [
          startDateAfter,
          startDateBefore
        ]
      }
    };

    Object.keys(whereObject).forEach(key => whereObject[key] === undefined && delete whereObject[key]);
    const fetchedAllocations = await Allocation.findAll({
      where: whereObject
    });


    return fetchedAllocations;
  }

  static async fetchSingleAllocation(id) {
    const fetchedAllocation = await Allocation.findOne({
      where: { id }
    });

    if(!fetchedAllocation) {
      throw new ResourceNotFoundError("There is no allocation associated with this id!", "AllocationNotFound");
    }

    return fetchedAllocation;
  }

  static async validateCreateAllocationData(createAllocationData) {
    const {
      roomId,
      userId,
      startDate
    } = createAllocationData;

    const validationError = new ValidationError;
    let room;
    let user;
    try {
      room = await RoomsService.fetchSingleRoom(roomId);
    }
    catch(error) {
      if(error instanceof ResourceNotFoundError) {
        validationError.addEntry(new ValidationErrorEntry(error.message, error.code));
      }
      else {
        throw error;
      }
    }

    try {
      user = await UsersService.fetchSingleUser(userId);
    }
    catch(error) {
      if(error instanceof ResourceNotFoundError) {
        validationError.addEntry(new ValidationErrorEntry(error.message, error.code));
      }
      else {
        throw error;
      }
    }

    if(!startDate) {
      validationError.addEntry(new ValidationErrorEntry("Start date is a required field!", "StartDateMissing"));      
    }

    const dateFormatIsValid = new dayjs(startDate, "YYYY-MM-DD HH:mm:ss", true).isValid();
    if(!dateFormatIsValid) {
      validationError.addEntry(new ValidationErrorEntry("Start date is not in the right format (YYYY-MM-DD HH:mm:ss)!", "InvalidStartDateFormat"));
    }

    const conflictingAllocations = await AllocationsService.fetchAllocations({
      roomId,
      startDate
    });

    if(conflictingAllocations.length !== 0) {
      validationError.addEntry(new ValidationErrorEntry("This room is already allocated at this date!", "AllocationConflict"));
    }

    if(validationError.hasErrors()) {
      throw validationError;
    }
  }

  static async createAllocation(createAllocationData) {
    const {
      roomId,
      userId,
      startDate
    } = createAllocationData;

    await AllocationsService.validateCreateAllocationData(createAllocationData);

    const createdAllocation = await Allocation.create({
      fkRoom: roomId,
      fkUser: userId,
      startDate: startDate
    });

    return createdAllocation;
  }

  static async deleteAllocation(id) {
    const deletedAllocation = await AllocationsService.fetchSingleAllocation(id);
    await deletedAllocation.destroy();
    return deletedAllocation;
  }
}