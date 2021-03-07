import { AuthenticationService } from "../services/AuthenticationService.js";
import { AuthenticationError } from "../exceptions/AuthenticationError.js";
import { controllerMethodWrapper } from "../helpers/controllerHelper.js";

export class AuthenticationController {
  static login = controllerMethodWrapper(async (req, res, next) => {
    const {
      userName = "",
      password = ""
    } = req.body;

    const user = await AuthenticationService.authenticateUserWithCredentials(userName, password);
    await AuthenticationService.clearUserSessions(user);
    const sessionId = await AuthenticationService.createSession(user);

    res.cookie("sessionId", sessionId, {
      maxAge: 3600 * 1000,
      sameSite: "Strict"
    });

    res.send(user);
  });

  static logout = controllerMethodWrapper(async (req, res, next) => {
    const sessionId = req.cookies["sessionId"];
    if(sessionId === undefined) {
      throw new AuthenticationError("No sessionId received!", "AnonymousUser");
    }

    await AuthenticationService.clearSessionById(sessionId);

    res.cookie("sessionId", "", { maxAge: 0 }); //Unset cookie
    res.send("Logout successful!");
  });

  static async checkSession(req, res, next) {
    res.send(req.authenticatedUser);
  }
}