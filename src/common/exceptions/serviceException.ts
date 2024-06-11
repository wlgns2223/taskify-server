import { HttpException } from '@nestjs/common';
import { BaseError } from '../errors/baseError';

export class ServiceException extends HttpException {
  private _error: BaseError;
  constructor(error: BaseError, message?: string) {
    super(message ?? error.message, error.status);
    this._error = error;
    if (message) {
      this._error.message = message;
    }
  }

  get error() {
    return this._error;
  }
}
