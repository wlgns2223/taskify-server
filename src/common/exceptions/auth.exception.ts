import { TokenExceptionType, TokenType } from '../../auth/types/type';
import { AuthError } from '../errors/authError';
import { ServiceException } from './serviceException';

export class AuthServiceException extends ServiceException {
  constructor(error: AuthError, message?: string) {
    super(error, message);
  }

  get error(): AuthError {
    return this._error as AuthError;
  }
}

export const TokenException = (
  tokenType: TokenType,
  cause: TokenExceptionType | string,
) => {
  return new AuthServiceException(new AuthError(tokenType, cause));
};
