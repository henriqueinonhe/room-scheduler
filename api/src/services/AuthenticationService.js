import crypto from "crypto";
import { User } from "../models/User.js";
import { Session } from "../models/Session.js";

export class AuthenticationService {
  static async hashPassword(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password);
  
    const hashedPassword = hash.digest("hex");
    return hashedPassword
  }

  static async generateSessionId() {
    const a = Math.random();
    const b = Math.random();
    const c = Date.now();
    const base = `${a}${b}${c}`;

    const hash = crypto.createHash("sha256");
    hash.update(base);
    const sessionId = hash.digest("hex");
    return sessionId;
  }

  static async authenticateUserWithCredentials(userName, password) {
    const passwordHash = await AuthenticationService.hashPassword(password);
    const user = await User.findOne({
      where: {
        userName,
        passwordHash
      },
      attributes: {
        exclude: ["passwordHash"]
      }
    });

    if(!user) {
      throw new AuthenticationError("User name and/or password don't match!", "LoginFail");
    }

    return user;
  }

  static async authenticeUserWithSession(sessionId) {
    const session = await Session.findOne({
      where: { sessionId },
      include: User
    });

    if(!session) {
      throw new AuthenticationError("This session is either invalid or has already expired!", "InvalidOrExpiredSession");
    }

    return session.User;
  }

  static async clearUserSessions(user) {
    const userId = user.id;
    await Session.destroy({
      where: {
        fkUser: userId
      }
    });
  }

  static async clearSessionById(sessionId) {
    await Session.destroy({
      where: {
        sessionId
      }
    });
  }

  static async createSession(user) {
    const userId = user.id;
    const sessionId = await AuthenticationService.generateSessionId();
    await Session.create({
      sessionId,
      fkUser: userId
    });

    return sessionId;
  }
}