import { AuthorizationError } from "../exceptions/AuthorizationError.js";

export function authorization(roles) {
  return (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;
    const userRole = authenticatedUser.role;

    if(!roles.includes(userRole)) {
      next(new AuthorizationError("You do not have authorization for this route!", "Unauthorized"));
      return;
    }
  };
}