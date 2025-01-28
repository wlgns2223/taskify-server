import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InternalServerException } from '../common/exceptions/exceptions';
import { CookieOptions } from 'express';

@Injectable()
export class CookieConfigService {
  private readonly cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  };

  private readonly _accessTokenName: string | undefined;
  private readonly _refreshTokenName: string | undefined;

  constructor(private configService: ConfigService) {
    this._accessTokenName = this.configService.get<string>('ACCESS_TOKEN_NAME');
    this._refreshTokenName = this.configService.get<string>('REFRESH_TOKEN_NAME');

    if (!this._accessTokenName || !this._refreshTokenName) {
      throw InternalServerException('Token name is not defined');
    }
  }

  getAccessTokenCookieConfig(token: string, expiresIn: Date) {
    if (!this._accessTokenName) {
      throw InternalServerException('Token name is not defined');
    }

    const cookieOptions: CookieOptions = {
      ...this.cookieOptions,
      expires: expiresIn,
    };

    return {
      tokenName: this._accessTokenName,
      value: token,
      cookieOptions,
    };
  }

  getRefreshTokenCookieConfig(token: string, expiresIn: Date | number) {
    if (!this._refreshTokenName) {
      throw InternalServerException('Token name is not defined');
    }

    const cookieOptions: CookieOptions = {
      ...this.cookieOptions,
      expires: typeof expiresIn === 'number' ? new Date(Date.now() + expiresIn * 1000) : expiresIn,
    };
    return {
      tokenName: this._refreshTokenName,
      value: token,
      cookieOptions,
    };
  }
}
