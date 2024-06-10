import { HttpStatus } from '@nestjs/common';
import { baseError } from '../errors/baseError';

export const DATA_NOT_FOUND = new baseError(
  'Data not found',
  HttpStatus.NOT_FOUND,
);
