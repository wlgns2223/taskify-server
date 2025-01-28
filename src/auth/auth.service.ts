import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  EntityNotFoundException,
  InternalServerException,
  InvalidInputException,
} from '../common/exceptions/exceptions';
import { JsonWebTokenError, JwtService, JwtSignOptions, TokenExpiredError } from '@nestjs/jwt';
import { JWT, JWTPayload, TokenExceptionType, TokenType } from './types/type';
import { TokenException } from '../common/exceptions/auth.exception';
import { SignUpDto } from '../users/dto/sign-up.dto';
import { UsersService, UsersServiceToken } from '../users/service/users.provider';
import { RefreshTokenService, RefreshTokenServiceToken } from '../token/service/refresh-token.service.provider';
import { RefreshTokenMapper } from '../token/refresh-token.mapper';
import { UserEntity } from '../users/users.entity';
import { SignInDto } from './dto/signIn.dto';
import { TokenConfigService } from './token-config.service';
import { TokenConfig } from './token-option';
import { DBConnectionService } from '../db/db.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    @Inject(UsersServiceToken)
    private usersService: UsersService,

    @Inject(RefreshTokenServiceToken)
    private refreshTokenService: RefreshTokenService,
    private tokenConfigService: TokenConfigService,
    private jwtService: JwtService,
    private dbService: DBConnectionService,
  ) {}

  decode(token: string) {
    return this.jwtService.decode(token);
  }

  private async generateToken<T extends object | Buffer>(payload: T, signOption?: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, signOption);
  }

  async signUp(signUpDto: SignUpDto) {
    if (!signUpDto.comparePassword()) {
      throw InvalidInputException('Password is not matched');
    }

    return await this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const userEntity = await this.handleUser(email, password);

    const payload: JWTPayload = {
      email: userEntity.email,
    };

    const { accessTokenConfig, refreshTokenConfig } = await this.handleToken(payload);

    await this.updateRefreshToken(userEntity, refreshTokenConfig);

    return {
      accessToken: accessTokenConfig,
      refreshToken: refreshTokenConfig,
    };
  }

  private async handleToken(payload: JWTPayload) {
    const accessTokenConfig = this.tokenConfigService.getAccessTokenConfig();
    const plainAccessToken = await this.generateToken(payload, accessTokenConfig.toJwtSignOptions());
    accessTokenConfig.token = plainAccessToken;

    const refreshTokenConfig = this.tokenConfigService.getRefreshTokenConfig();
    const plainRefreshToken = await this.generateToken(payload, refreshTokenConfig.toJwtSignOptions());
    refreshTokenConfig.token = plainRefreshToken;

    return { accessTokenConfig, refreshTokenConfig };
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

  private async updateRefreshToken(userEntity: UserEntity, refreshToken: TokenConfig) {
    if (!userEntity.id) {
      throw InternalServerException('User id is not defined');
    }
    const storedRefreshToken = await this.refreshTokenService.findOneBy(userEntity.id);
    if (storedRefreshToken !== null && storedRefreshToken.id !== undefined) {
      await this.refreshTokenService.updateOneBy(storedRefreshToken.id, refreshToken.token);
    }
  }

  async renewToken(refreshToken: string) {
    const token = await this.verify(refreshToken, TokenType.REFRESH);
    const { previousTokenEntity, user } = await this.compareRefreshTokenAndGetOldToken(token.email, refreshToken);

    if (previousTokenEntity.id === undefined) {
      throw InternalServerException('Refresh token id is not defined');
    }

    if (!user.id) {
      throw InternalServerException('User id is not defined');
    }

    const payload: JWTPayload = {
      email: token.email,
    };
    const { accessTokenConfig, refreshTokenConfig } = await this.handleToken(payload);

    await this.refreshTokenService.updateOneBy(previousTokenEntity.id, refreshTokenConfig.token);

    return { accessTokenConfig, refreshTokenConfig };
  }

  async verify(token: string, tokenType: TokenType) {
    try {
      return (await this.jwtService.verifyAsync(token)) as JWT;
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

  private async compareRefreshTokenAndGetOldToken(userEmail: string, refreshToken: string) {
    const user = await this.usersService.findOneBy(userEmail);
    if (user === null) {
      throw EntityNotFoundException(`User with email ${userEmail} not found`);
    }

    if (!user.id) {
      throw InternalServerException('User id is not defined');
    }

    const tokenEntity = await this.refreshTokenService.findOneBy(user.id);
    if (tokenEntity === null) {
      throw TokenException(TokenType.REFRESH, TokenExceptionType.UNDEFINED);
    }

    if (tokenEntity.token !== refreshToken) {
      throw TokenException(TokenType.REFRESH, TokenExceptionType.INVALID_TOKEN);
    }

    return { previousTokenEntity: tokenEntity, user };
  }
}
