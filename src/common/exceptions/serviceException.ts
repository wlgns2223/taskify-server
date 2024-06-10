import { baseError } from '../errors/baseError';

export class ServiceException extends Error {
  private _error: baseError;
  constructor(error: baseError, message?: string) {
    super(message ?? error.message);
    this._error = error;
    if (message) {
      this._error.message = message;
    }
  }

  get error() {
    return this._error;
  }
}
