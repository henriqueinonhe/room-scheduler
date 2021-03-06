import { User } from "../models/User.js";
import { ValidationError, ValidationErrorEntry } from "../exceptions/ValidationError.js";
import Sequelize from "sequelize";
import { hashPassword } from "../helpers/cryptoHelper.js";

const { Op } = Sequelize;

export class UsersController {
  
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
      }
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
    const {
      userName = "",
      role = "",
      createdBefore = "1900-01-01",
      createdAfter = "3000-01-01"
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
      }
    });

    res.send(fetchedUsers);
  }

  static async fetchSingleUser(req, res, next) {
    const id = req.params["id"];

    res.send(await User.findOne({
      where: {
        id
      }
    }));
  }

  static async createUser(req, res, next) {
    const {
      userName = "",
      password = ""
    } = req.body;

    try {
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

      res.status(201).send(user);
    }
    catch(error) {
      next(error);   
    }
  }

  static async updateUser(req, res, next) {
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
      userName = "",
      password = ""
    } = req.body;

    try {
      const validationError = new ValidationError();
      const trimmedUserName = userName.trim();
      validationError.addEntry(...await UsersController.validateUserName(trimmedUserName));
      validationError.addEntry(...await UsersController.validatePassword(password));
  
      if(validationError.hasErrors()) {
        throw validationError;
      }
  
      const passwordHash = await UsersController.hashPassword(password);
      user.userName = userName;
      user.passwordHash = passwordHash;
      await user.save();

      res.status(201).send(user);
    }
    catch(error) {
      next(error);  
    }
  }

  static async deleteUser(req, res, next) {
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
    res.send(user);

    //TODO Cascade allocations
  }
}