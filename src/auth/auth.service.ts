import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  EntityNotFoundException,
  InternalServerException,
  InvalidInputException,
} from '../common/exceptions/exceptions';
import { JsonWebTokenError, JwtService, JwtSignOptions, TokenExpiredError } from '@nestjs/jwt';
import { TokenExceptionType, TokenType } from './types/type';
import { TokenException } from '../common/exceptions/auth.exception';
import { ConfigService } from '@nestjs/config';
import { Token } from './vo/token';
import ms from 'ms';
import { SignUpDto } from '../users/dto/sign-up.dto';
import { UsersService, UsersServiceToken } from '../users/service/users.provider';
import { RefreshTokenService, RefreshTokenServiceToken } from '../token/service/refresh-token.service.provider';
import { RefreshTokenMapper } from '../token/refresh-token.mapper';
import { UserEntity } from '../users/users.entity';
import { RefreshToken } from '../token/refresh-token.entity';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  private accessToken: Token;
  private refreshToken: Token;

  constructor(
    @Inject(UsersServiceToken)
    private usersService: UsersService,

    @Inject(RefreshTokenServiceToken)
    private refreshTokenService: RefreshTokenService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const accessTokenName = this.configService.get<string>('ACCESS_TOKEN_NAME');
    const refreshTokenName = this.configService.get<string>('REFRESH_TOKEN_NAME');

    if (!accessTokenName || !refreshTokenName) {
      throw InvalidInputException('Token name is not defined');
    }
    const accessTokenExpire = this.configService.get<string>('ACCESS_TOKEN_EXPIRE');
    const refreshTokenExpire = this.configService.get<string>('REFRESH_TOKEN_EXPIRE');

    if (!accessTokenExpire || !refreshTokenExpire) {
      throw InvalidInputException('Token expire time is not defined');
    }

    this.accessToken = Token.from(accessTokenName, { expiresIn: accessTokenExpire });
    this.refreshToken = Token.from(refreshTokenName, { expiresIn: refreshTokenExpire });
  }

  decode(token: string): TokenPayload {
    return this.jwtService.decode(token);
  }

  /**
   *  VO를 리턴하도록 리팩토링하자.
   */
  private async generateToken<T extends object | Buffer>(payload: T, signOption?: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, {
      ...signOption,
    });
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.usersService.create(signUpDto);
  }

  async signIn(email: string, password: string) {
    const userEntity = await this.handleUser(email, password);

    const plainAccessToken = await this.generateToken(
      {
        email: userEntity.email,
      },
      this.accessToken.signOption,
    );
    const plainRefreshToken = await this.generateToken(
      {
        email: userEntity.email,
      },
      this.refreshToken.signOption,
    );

    await this.createRefreshToken(userEntity, plainRefreshToken);

    return {
      accessToken: plainAccessToken,
      refreshToken: plainRefreshToken,
    };
  }

  private async handleUser(email: string, password: string) {
    const userEntiy = await this.usersService.findOneBy(email);
    if (!userEntiy) {
      throw EntityNotFoundException(`User with email ${email} not found`);
    }

    const result = userEntiy.comparePassword(password);

    if (!result) {
      throw InvalidInputException('Invalid password');
    }

    return userEntiy;
  }

  private async createRefreshToken(userEntity: UserEntity, refreshToken: string) {
    if (!userEntity.id) {
      throw InternalServerException('User id is not defined');
    }
    const storedRefreshToken = await this.refreshTokenService.findOneBy(userEntity.id);
    if (storedRefreshToken !== null) {
      await this.refreshTokenService.deleteAllBy(userEntity.id);
    }

    await this.refreshTokenService.create(
      RefreshTokenMapper.toEntity({
        userId: userEntity.id,
        token: refreshToken,
        expiresAt: this.refreshToken.expireAtInSec(),
      }),
    );
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
    const user = await this.usersService.findOneBy(userEmail);
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
