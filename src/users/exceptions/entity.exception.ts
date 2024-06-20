import { HttpStatus } from '@nestjs/common';
import { BaseError } from '../../common/errors/baseError';
import { ServiceException } from '../../common/exceptions/serviceException';

const CONFLICT_REQUEST = new BaseError('Data Conflict', HttpStatus.CONFLICT);

export const EntityAlreadyExists = (message?: string) => {
  return new ServiceException(CONFLICT_REQUEST, message);
};
