import { Allocation } from "../models/Allocation.js";
import { ResourceNotFoundError } from "../exceptions/ResourceNotFoundError.js";
import { ValidationError, ValidationErrorEntry } from "../exceptions/ValidationError.js";
import { RoomsService } from "./RoomsService.js";
import { UsersService } from "./UsersService.js"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import Sequelize from "sequelize";
import { defaultVeryEarlyDate, defaultVeryLateDate } from "../helpers/dateHelper.js";
import { Room } from "../models/Room.js";
import { User } from "../models/User.js";
import { paginate } from "../helpers/paginationHelper.js";

const { Op } = Sequelize;

dayjs.extend(customParseFormat);

export class AllocationsService {
  static resultsPerPage = 50;

  static async fetchAllocations(query) {
    const {
      userId,
      roomId,
      userName = "",
      roomName = "",
      startDateAfter = defaultVeryEarlyDate,
      startDateBefore = defaultVeryLateDate,
      page = 1
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

    //Remove undefined values
    Object.keys(whereObject)
      .forEach(key => whereObject[key] === undefined && delete whereObject[key]);

    const fetchedAllocations = await paginate({
      model: Allocation,
      queryConfig: {
        where: whereObject,
        include: [{
          model: User,
          attributes: {
            exclude: ["passwordHash"]
          },
          where: {
            userName: {
              [Op.like]: `%${userName}%`
            }
          }
        },
          {
            model: Room,
            where: {
              name: {
                [Op.like]: `%${roomName}%`
              }
            }
          }
        ]
      },
      resultsPerPage: AllocationsService.resultsPerPage,
      page
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

    const parsedDate = new dayjs(startDate, "YYYY-MM-DD HH:mm:ss", true);
    const dateFormatIsValid = parsedDate.isValid();
    if(!dateFormatIsValid) {
      validationError.addEntry(new ValidationErrorEntry("Start date is not in the right format (YYYY-MM-DD HH:mm:ss)!", "InvalidStartDateFormat"));
    }
    else {
      if(parsedDate.minute() !== 0 || parsedDate.second() !== 0) {
        validationError.addEntry(new ValidationErrorEntry("Minutes and seconds must be equal 0!", "MinutesOrSecondNotEqualZero"));
      }
    }

    const roomConflictingAllocations = await AllocationsService.fetchAllocations({
      roomId,
      startDateAfter: startDate,
      startDateBefore: startDate
    });

    if(roomConflictingAllocations.meta.total !== 0) {
      validationError.addEntry(new ValidationErrorEntry("This room is already allocated at this date!", "AllocationConflict"));
    }

    const userConflictingAllocations = await AllocationsService.fetchAllocations({
      userId,
      startDateAfter: startDate,
      startDateBefore: startDate
    });

    if(userConflictingAllocations.meta.total !== 0) {
      validationError.addEntry(new ValidationErrorEntry(`You already have an allocation at this date (${JSON.stringify(userConflictingAllocations.data)})!`, "AllocationConflict"))
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