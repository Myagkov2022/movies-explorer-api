const { CONFLICT_CODE } = require('./constants-err');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_CODE;
  }
}

module.exports = { ConflictError };
