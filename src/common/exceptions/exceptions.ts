import {
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ServiceException } from './serviceException';
import {
  DATA_ALREADY_EXISTS,
  DATA_NOT_FOUND,
  INVALID_INPUT,
  UNAUTHORIZED,
} from './errors';

export const DatabaseError = (query?: string) => {
  return new InternalServerErrorException(`Database Error: ${query}`);
};

export const EntityNotFoundException = (message?: string) => {
  return new ServiceException(DATA_NOT_FOUND, message);
};

export const EntityAlreadyExistsException = (message?: string) => {
  return new ServiceException(DATA_ALREADY_EXISTS, message);
};

export const InvalidInputException = (message?: string) => {
  return new ServiceException(INVALID_INPUT, message);
};
