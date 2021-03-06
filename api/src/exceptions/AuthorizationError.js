export class AuthorizationError {
  constructor(message) {
    this.message = message;
    this.type = "AuthorizationError";
  }
}