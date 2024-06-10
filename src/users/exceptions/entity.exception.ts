import { HttpStatus } from '@nestjs/common';
import { baseError } from '../../common/errors/baseError';
import { ServiceException } from '../../common/exceptions/serviceException';

const CONFLICT_REQUEST = new baseError('Data Conflict', HttpStatus.CONFLICT);

export const EntityAlreadyExists = (message?: string) => {
  return new ServiceException(CONFLICT_REQUEST, message);
};
