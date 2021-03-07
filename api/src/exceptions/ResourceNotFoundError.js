import { BaseError } from "./BaseError.js";

export class ResourceNotFoundError extends BaseError {
  constructor(message, code) {
    super(message, "ResourceNotFoundError", code);
  }
}