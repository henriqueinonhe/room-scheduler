import { hashPassword, generateSessionId } from "../helpers/cryptoHelper.js";
import { User } from "../models/User.js";
import { AuthenticationError } from "../exceptions/AuthenticationError.js";
import { Session } from "../models/Session.js";

export class AuthenticationController {
  static async login(req, res, next) {
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
      const error = new AuthenticationError("User name and/or password don't match!");
      next(error);
      return;
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
    res.send("Login successful!");
  }

  static async logout(req, res, next) {
    //TODO
    next();
  }

  static async checkSession(req, res, next) {
    const sessionId = req.cookies["sessionId"];

    if(sessionId === undefined) {
      
    }
  }
}