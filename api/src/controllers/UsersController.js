import { User } from "../models/User.js";
import { ValidationError, ValidationErrorEntry } from "../exceptions/ValidationError.js";
import Sequelize from "sequelize";
import { hashPassword } from "../helpers/cryptoHelper.js";
import { defaultVeryEarlyDate, defaultVeryLateDate } from "../helpers/dateHelper.js";
import { ResourceNotFoundError } from "../exceptions/ResourceNotFoundError.js";

const { Op } = Sequelize;

export class UsersController {
  static hidePasswordUserAttributeSelection = {
    exclude: ["passwordHash"]
  };
  
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
      attributes: UsersController.hidePasswordUserAttributeSelection
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

  static async fetchUsers(req, res, next) {
    try {
      const {
        userName = "",
        role = "",
        createdBefore = defaultVeryEarlyDate,
        createdAfter = defaultVeryLateDate
      } = req.query;
  
      const fetchedUsers = await User.findAll({
        where: {
          userName: {
            [Op.like]: `%${userName}%`
          },
          role: {
            [Op.like]: `%${role}%`
          },
          createdAt: {
            [Op.between]: [
              createdBefore,
              createdAfter
            ]
          }
        },
        attributes: UsersController.hidePasswordUserAttributeSelection
      });
  
      res.send(fetchedUsers);
    }
    catch(error) {
      next(error);
      return;
    }
  }

  static async fetchSingleUser(req, res, next) {
    try {
      const id = req.params["id"];

      const user = await User.findOne({
        where: {
          id
        },
        attributes: UsersController.hidePasswordUserAttributeSelection
      });

      if(!user) {
        throw new ResourceNotFoundError("There is no user associated with this id!", "UserNotFound");
      }
  
      res.send(user);
    }
    catch(error) {
      next(error);
      return;
    }
  }

  static async createUser(req, res, next) {
    try {
      const {
        userName = "",
        password = ""
      } = req.body;
  
        const validationError = new ValidationError();
        const trimmedUserName = userName.trim();
        validationError.addEntry(...await UsersController.validateUserName(trimmedUserName));
        validationError.addEntry(...await UsersController.validatePassword(password));
    
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
  
        res.status(201).send(userWithoutPassword);
    }
    catch(error) {
      next(error);
      return;
    }
  }

  static async updateUser(req, res, next) {
    //NOTE Maybe this logic could be better
    try {
      const id = req.params["id"];
      const user = await User.findOne({
        where: { id }
      });

      if(!user) {
        next(new ValidationError([
          new ValidationErrorEntry("There is no user associated with this id!", "UserToUpdateNotFound")
        ]));
        return;
      }

      const {
        userName: receivedUserName,
        password: receivedPassword
      } = req.body;

      const validationError = new ValidationError();

      let userName;
      if(receivedUserName) {
        userName = receivedUserName.trim();
        validationError.addEntry(...await UsersController.validateUserName(userName));
      }
      else {
        userName = user.userName;
      }

      let passwordHash;
      if(receivedPassword) {
        validationError.addEntry(...await UsersController.validatePassword(receivedPassword));
        passwordHash = await hashPassword(receivedPassword);
      }
      else {
        passwordHash = user.passwordHash;
      }
  
      if(validationError.hasErrors()) {
        throw validationError;
      }
  
      user.userName = userName;
      user.passwordHash = passwordHash;
      await user.save();

      const {
        passwordHash : dummy,
        ...userWithoutPassword
      } = user.get();

      res.status(201).send(userWithoutPassword);
    }
    catch(error) {
      next(error);
      return;
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const id = req.params["id"];
      const user = await User.findOne({ where : { id }});
  
      if(!user) {
        const error = new ValidationError([
          new ValidationErrorEntry("There is no user associated with this id!", "UserToDeleteNotFound")
        ]);
        next(error);
        return;
      }
  
      await user.destroy();

      const {
        passwordHash : dummy,
        ...userWithoutPassword
      } = user.get();
      res.send(userWithoutPassword);
  
    }
    catch(error) {
      next(error);
      return;
    }
  }
}