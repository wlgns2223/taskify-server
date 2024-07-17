import { HttpStatus } from '@nestjs/common';
import { BaseError } from '../errors/baseError';

export const DATA_NOT_FOUND = new BaseError(
  'Data not found',
  HttpStatus.NOT_FOUND,
);

export const DATA_ALREADY_EXISTS = new BaseError(
  'Data already exists',
  HttpStatus.CONFLICT,
);

export const INVALID_INPUT = new BaseError(
  'Invalid input',
  HttpStatus.BAD_REQUEST,
);
