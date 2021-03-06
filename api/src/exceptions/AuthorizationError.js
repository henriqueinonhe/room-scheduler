import { BaseError } from "./BaseError.js";

export class AuthorizationError extends BaseError {
  constructor(message, code) {
    super(message, "AuthorizationError", code)
  }
}