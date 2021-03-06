import { User } from "../models/User.js";
import { Session } from "../models/Session.js";

export async function authentication(req, res, next) {
  try {
    const sessionId = req.cookies["sessionId"];
    if(sessionId === undefined) {
      throw new AuthenticationError("No sessionId received!", "AnonynousUser");
    }

    const session = await Session.findOne({
      where: {
        sessionId
      },
      include: User
    });

    if(!session) {
      throw new AuthenticationError("This session is either invalid or has already expired!", "InvalidOrExpiredSession");
    }

    const {
      id,
      userName,
      role,
      createdAt
    } = session.User;

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