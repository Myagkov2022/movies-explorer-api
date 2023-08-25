const { VALIDATION_CODE } = require('./constants-err');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_CODE;
  }
}

module.exports = { ValidationError };
