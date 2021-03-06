export class BaseError {
  constructor(message, type, code) {
    this.message = message;
    this.type = type;
    this.code = code;
  }
}