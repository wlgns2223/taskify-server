import { HttpStatus } from '@nestjs/common';
import { BaseError } from '../errors/baseError';

export const DATA_NOT_FOUND = new BaseError('Data not found', HttpStatus.NOT_FOUND);

export const DATA_ALREADY_EXISTS = new BaseError('Data already exists', HttpStatus.CONFLICT);

export const INVALID_INPUT = new BaseError('Invalid input', HttpStatus.BAD_REQUEST);

export const UNAUTHORIZED = new BaseError('Unauthorized', HttpStatus.UNAUTHORIZED);

export const INTERNAL_SERVER_ERROR = new BaseError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
