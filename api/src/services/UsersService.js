import { User } from "../models/User.js";
import { ValidationError, ValidationErrorEntry } from "../exceptions/ValidationError.js";
import Sequelize from "sequelize";
import { defaultVeryEarlyDate, defaultVeryLateDate } from "../helpers/dateHelper.js";
import { ResourceNotFoundError } from "../exceptions/ResourceNotFoundError.js";
import { AuthenticationService } from "./AuthenticationService.js";
import { paginate } from "../helpers/paginationHelper.js";

const { Op } = Sequelize;

export class UsersService {
  static hidePasswordUserAttributeSelection = {
    exclude: ["passwordHash"]
  };

  static resultsPerPage = 20;
  
  static async validateUserName(userName) {
    const entries = [];
    if(userName === undefined) {
      entries.push(new ValidationErrorEntry("User name is required!", "UserNameRequired"));
    }

    if(userName.length < 4) {
      entries.push(new ValidationErrorEntry("User name must be at least 4 characters long!", "UserNameTooShort"));
    }

    if(userName.length > 30) {
      entries.push(new ValidationErrorEntry("User name must not be greater than 30 characters long!", "UserNameTooLong"));
    }

    if(!/^([A-z]|[0-9])+$/.test(userName)) {
      entries.push(new ValidationErrorEntry("User name must contain only letters and numbers (whitespace is not allowed).", "UserNameWithInvalidCharacters"));
    }

    if(entries.length !== 0) {
      return entries;
    }

    const usersWithThisUserName = await User.findAll({
      where: {
        userName
      },
      attributes: UsersService.hidePasswordUserAttributeSelection
    });
    if(usersWithThisUserName.length !== 0) {
      entries.push(new ValidationErrorEntry("This user name is already in use!", "UserNameAlreadyExists"));
    }
    
    return entries;
  }

  static async validatePassword(password) {
    const entries = [];
    if(password === undefined) {
      entries.push(new ValidationErrorEntry("Password is required!", "PasswordRequired"));
    }

    if(password.length < 8) {
      entries.push(new ValidationErrorEntry("Password must be at least 8 characters long!", "PasswordTooShort"));
    }

    if(password.length > 64) {
      entries.push(new ValidationErrorEntry("Password must not be greater than 64 characters long!", "PasswordTooLong"));
    }

    return entries;
  }
  
  static async fetchUsers(query) {
    const {
      userName = "",
      role = "",
      createdAfter = defaultVeryEarlyDate,
      createdBefore = defaultVeryLateDate,
      page = 1
    } = query;

    const fetchedUsers = await paginate({
      model: User,
      queryConfig: {
        where: {
          userName: {
            [Op.like]: `%${userName}%`
          },
          role: {
            [Op.like]: `%${role}%`
          },
          createdAt: {
            [Op.between]: [
              createdAfter,
              createdBefore
            ]
          }
        },
        attributes: UsersService.hidePasswordUserAttributeSelection
      },
      resultsPerPage: UsersService.resultsPerPage,
      page
    });

    return fetchedUsers;
  }

  static async fetchSingleUser(id) {
    const user = await User.findOne({
      where: {
        id
      },
      attributes: UsersService.hidePasswordUserAttributeSelection
    });

    if(!user) {
      throw new ResourceNotFoundError("There is no user associated with this id!", "UserNotFound");
    }

    return user;
  }

  static async createUser(createUserData) {
    const {
      userName,
      password
    } = createUserData;

    const validationError = new ValidationError();
    const trimmedUserName = userName.trim();
    validationError.addEntry(...await UsersService.validateUserName(trimmedUserName));
    validationError.addEntry(...await UsersService.validatePassword(password));

    if(validationError.hasErrors()) {
      throw validationError;
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      userName: trimmedUserName,
      passwordHash,
      role: "common"
    });
    
    const {
      passwordHash : dummy,
      ...userWithoutPassword
    } = user.get();

    return userWithoutPassword;
  }

  static async updateUser(id, updateUserData) {
    const userToBeUpdated = await UsersService.fetchSingleUser(id);
    const {
      userName: receivedUserName,
      password: receivedPassword
    } = updateUserData;

    const validationError = new ValidationError();

    const userName = receivedUserName ? 
                     receivedUserName.trim() : userToBeUpdated.userName;
    validationError.addEntry(...UsersService.validateUserName(userName));

    if(receivedPassword) {
      validationError.addEntry(...await UsersService.validatePassword(receivedPassword));
    }
    const passwordHash = receivedPassword ? 
                         await AuthenticationService.hashPassword(receivedPassword) : 
                         userToBeUpdated.passwordHash;


    if(validationError.hasErrors()) {
      throw validationError;
    }

    userToBeUpdated.userName = userName;
    userToBeUpdated.passwordHash = passwordHash;
    await userToBeUpdated.save();

    const {
      passwordHash : dummy,
      ...userWithoutPassword
    } = userToBeUpdated.get();

    return userWithoutPassword;
  }

  static async deleteUser(id) {
    const user = await UsersService.fetchSingleUser(id);

    await user.destroy();
    const {
      passwordHash : dummy,
      ...userWithoutPassword
    } = user.get();

    return userWithoutPassword;
  }
}