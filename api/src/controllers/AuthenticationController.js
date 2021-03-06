import { hashPassword, generateSessionId } from "../helpers/cryptoHelper.js";
import { User } from "../models/User.js";
import { AuthenticationError } from "../exceptions/AuthenticationError.js";
import { Session } from "../models/Session.js";

export class AuthenticationController {
  static async login(req, res, next) {
    try {
      const {
        userName = "",
        password = ""
      } = req.body;
  
      const passwordHash = await hashPassword(password);
  
      const user = await User.findOne({
        where: {
          userName,
          passwordHash
        }
      });
  
      if(!user) {
        throw new AuthenticationError("User name and/or password don't match!", "LoginFail");
      }
  
      //Clear previous sessions
      const userId = user.id;
      await Session.destroy({
        where: {
          fkUser: userId
        }
      });
  
      //Create new session
      const sessionId = await generateSessionId();
      await Session.create({
        sessionId,
        fkUser: userId
      });
  
      res.cookie("sessionId", sessionId, {
        maxAge: 3600 * 1000,
        sameSite: "Strict"
      });
      res.send("Login successful");
    }
    catch(error) {
      next(error);
      return;
    }
  }

  static async logout(req, res, next) {
    try {
      const sessionId = req.cookies["sessionId"];
      if(sessionId === undefined) {
        throw new AuthenticationError("No sessionId received!", "AnymousUser");
      }

      await Session.destroy({
        where: {
          sessionId
        }
      });

      res.cookie("sessionId", "", { maxAge: 0 });
      res.send("Logout successful!");
    }
    catch(error) {
      next(error);
      return;
    }
  }

  static async checkSession(req, res, next) {
    res.send(req.authenticatedUser);
  }
}