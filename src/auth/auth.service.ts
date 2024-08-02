import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { InvalidInputException } from '../common/exceptions/exceptions';
import { TokenService } from './token.service';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { TokenExceptionType, TokenType } from './types/type';
import { TokenException } from '../common/exceptions/auth.exception';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async signUp(email: string, nickname: string, password: string) {
    return await this.usersService.createUser(email, nickname, password);
  }

  async signIn(email: string, password: string) {
    const found = await this.usersService.findUserByEmail(email);
    const user = User.from(found);
    const result = user.comparePassword(password);

    if (!result) {
      throw InvalidInputException('Invalid password');
    }
    const accessToken = await this.tokenService.signAccessToken(user.email);
    const refreshToken = await this.tokenService.signRefreshToken(user.email);

    await this.tokenService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async verify(token: string, tokenType: TokenType) {
    try {
      return await this.tokenService.verifyToken(token);
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`${tokenType} : ${token} is invalid or expired`);
      if (e instanceof TokenExpiredError) {
        throw TokenException(tokenType, TokenExceptionType.EXPIRED);
      } else if (e instanceof JsonWebTokenError) {
        throw TokenException(tokenType, TokenExceptionType.INVALID_TOKEN);
      } else {
        throw TokenException(tokenType, e.message);
      }
    }
  }

  async refreshToken(userEmail: string, refreshToken: string) {
    const isTokenValid = await this.compareRefreshToken(
      userEmail,
      refreshToken,
    );

    if (!isTokenValid) {
      throw TokenException(TokenType.REFRESH, TokenExceptionType.INVALID_TOKEN);
    }

    // access token, refresh token 재발급
    // refresh token은 새로 발급된 토큰으로 교체 후 디비에 저장

    return 'new token';
  }
  private async compareRefreshToken(userEmail: string, refreshToken: string) {
    const user = await this.usersService.findUserByEmail(userEmail);
    const token = await this.tokenService.findRefreshToken(user.id);
    if (token === null) {
      throw TokenException(TokenType.REFRESH, TokenExceptionType.UNDEFINED);
    }

    return token.token === refreshToken;
  }
}
