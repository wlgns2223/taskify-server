import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { InvalidInputException } from '../common/exceptions/exceptions';
import { TokenService } from './token.service';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { TokenExceptionType, TokenType } from './types/type';
import { TokenException } from '../common/exceptions/auth.exception';
import { ConfigService } from '@nestjs/config';
import { Token } from './vo/token';
import ms from 'ms';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  private accessToken: Token;
  private refreshToken: Token;

  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {
    const accessTokenName = this.configService.get<string>('ACCESS_TOKEN_NAME');
    const refreshTokenName = this.configService.get<string>('REFRESH_TOKEN_NAME');

    if (!accessTokenName || !refreshTokenName) {
      throw InvalidInputException('Token name is not defined');
    }

    const accessTokenTime = '1h';
    const refreshTokenTime = '3h';

    this.accessToken = new Token(accessTokenName, {
      timeInSec: accessTokenTime,
      timeInMs: ms(accessTokenTime),
    });

    this.refreshToken = new Token(refreshTokenName, {
      timeInSec: refreshTokenTime,
      timeInMs: ms(refreshTokenTime),
    });
  }

  async signUp(email: string, nickname: string, password: string, teamId: string) {
    return await this.usersService.createUser(email, nickname, password, teamId);
  }

  async signIn(email: string, password: string) {
    const found = await this.usersService.findUserByEmail(email);
    const user = User.from(User, found);
    const result = user.comparePassword(password);

    if (!result) {
      throw InvalidInputException('Invalid password');
    }

    const accessToken = await this.tokenService.getSignedToken(user.email, this.accessToken);
    const refreshToken = await this.tokenService.getSignedToken(user.email, this.refreshToken);

    const storedRefreshToken = await this.tokenService.findRefreshToken(user.id);
    if (storedRefreshToken !== null) {
      await this.tokenService.deleteAllStoredRefreshTokens(user.id);
    }

    await this.tokenService.saveRefreshToken(user.id, refreshToken.token);
    return {
      accessToken,
      refreshToken,
    };
  }

  async verify(token: string, tokenType: TokenType) {
    try {
      return await this.tokenService.verifyToken(token);
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`${tokenType} : ${token} is invalid or expired`);

      // TokenExpiredError: jwt expired
      if (e instanceof TokenExpiredError) {
        throw TokenException(tokenType, TokenExceptionType.EXPIRED);

        // Invalid Token Error
      } else if (e instanceof JsonWebTokenError) {
        throw TokenException(tokenType, TokenExceptionType.INVALID_TOKEN);
      } else {
        throw TokenException(tokenType, e.message);
      }
    }
  }

  async renewToken(refreshToken: string) {
    const payload = await this.verify(refreshToken, TokenType.REFRESH);
    const { oldToken, user } = await this.compareRefreshTokenAndGetOldToken(payload.email, refreshToken);

    await this.tokenService.deleteStoredRefreshToken(oldToken.id);

    const accessToken = await this.tokenService.getSignedToken(payload.email, this.accessToken);

    const newRefreshToken = await this.tokenService.getSignedToken(payload.email, this.refreshToken);

    await this.tokenService.saveRefreshToken(user.id, newRefreshToken.token);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async compareRefreshTokenAndGetOldToken(userEmail: string, refreshToken: string) {
    const user = await this.usersService.findUserByEmail(userEmail);
    const token = await this.tokenService.findRefreshToken(user.id);
    if (token === null) {
      throw TokenException(TokenType.REFRESH, TokenExceptionType.UNDEFINED);
    }

    if (token.token !== refreshToken) {
      throw TokenException(TokenType.REFRESH, TokenExceptionType.INVALID_TOKEN);
    }

    return { oldToken: token, user };
  }
}
