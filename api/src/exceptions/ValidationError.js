export class ValidationError {
  constructor(entries = []) {
    this.entries = entries;
    this.type = "ValidationError";
  }

  addEntry(...entries) {
    this.entries.push(...entries);
  }

  hasErrors() {
    return this.entries.length !== 0;
  }
}


export class ValidationErrorEntry {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
}