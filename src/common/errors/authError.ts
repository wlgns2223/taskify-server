import { HttpStatus } from '@nestjs/common';
import { TokenType } from '../../auth/types/type';
import { BaseError } from './baseError';

export class AuthError extends BaseError {
  private _tokenType: TokenType;
  constructor(tokenType: TokenType, message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
    this._tokenType = tokenType;
  }

  get tokenType() {
    return this._tokenType;
  }

  set tokenType(tokenType: TokenType) {
    this._tokenType = tokenType;
  }
}
