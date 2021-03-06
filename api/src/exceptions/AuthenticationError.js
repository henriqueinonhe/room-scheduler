import { BaseError } from "./BaseError.js";

export class AuthenticationError extends BaseError {
  constructor(message, code) {
    super(message, "AuthenticationError", code)
  }
}