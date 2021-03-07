import { User } from "../models/User.js";
import { Session } from "../models/Session.js";
import { AuthenticationError } from "../exceptions/AuthenticationError.js";
import { AuthenticationService } from "../services/AuthenticationService.js";

export async function authentication(req, res, next) {
  try {
    const sessionId = req.cookies["sessionId"];
    if(sessionId === undefined) {
      throw new AuthenticationError("No sessionId received!", "AnonymousUser");
    }

    const authenticatedUser = await AuthenticationService.authenticeUserWithSession(sessionId);
    const {
      id,
      userName,
      role,
      createdAt
    } = authenticatedUser;

    req.authenticatedUser = {
      id,
      userName,
      role,
      createdAt
    };
    next();
  }
  catch(error) {
    next(error);
    return;
  }
}