export class AuthenticationError {
  constructor(message) {
    this.message = message;
    this.type = "AuthenticationError";
  }
}