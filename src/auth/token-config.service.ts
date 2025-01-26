import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InternalServerException } from '../common/exceptions/exceptions';
import { TokenConfig } from './token-option';

@Injectable()
export class TokenConfigService {
  private readonly accessTokenExpiresIn: string | undefined;
  private readonly refreshTokenExpiresIn: string | undefined;
  constructor(private readonly configService: ConfigService) {
    this.accessTokenExpiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN');
    this.refreshTokenExpiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN');

    if (!this.accessTokenExpiresIn || !this.refreshTokenExpiresIn) {
      throw InternalServerException('Token expiration time is not defined');
    }
  }

  getAccessTokenConfig() {
    if (!this.accessTokenExpiresIn) {
      throw InternalServerException('Token expiration time is not defined');
    }

    return TokenConfig.from({ expiresIn: this.accessTokenExpiresIn });
  }

  getRefreshTokenConfig() {
    if (!this.refreshTokenExpiresIn) {
      throw InternalServerException('Token expiration time is not defined');
    }

    return TokenConfig.from({ expiresIn: this.refreshTokenExpiresIn });
  }
}
