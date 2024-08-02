import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenExceptionType, TokenType, TokenTypeValues } from '../types/type';
import { TokenException } from '../../common/exceptions/auth.exception';

export const TokenFromReq = createParamDecorator(
  (data: TokenTypeValues, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const key = data === 'access' ? 'ACCESS_TOKEN_NAME' : 'REFRESH_TOKEN_NAME';
    const tokenName = process.env[key];
    const token = request.cookies[tokenName] as string | undefined;

    if (!token) {
      throw TokenException(TokenType.ACCESS, TokenExceptionType.UNDEFINED);
    }

    return token;
  },
);
