import { User } from "../models/User.js";
import { ValidationError, ValidationErrorEntry } from "../exceptions/ValidationError.js";
import crypto from "crypto";

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

  static async hashPassword(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password);

    const hashedPassword = hash.digest("hex");
    return hashedPassword;
  }

  static async fetchUsers(req, res, next) {
    //TODO
    next();
  }

  static async fetchSingleUser(req, res, next) {
    //TODO
    next();
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
  
      const passwordHash = await UsersController.hashPassword(password);
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
    //TODO
    next();
  }

  static async deleteUser(req, res, next) {
    //TODO
    next();
  }
}