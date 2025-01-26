import { JwtSignOptions } from '@nestjs/jwt';
import ms from 'ms';
import { InternalServerException } from '../../common/exceptions/exceptions';

export class Token {
  private _tokenName: string;
  private _signOption: JwtSignOptions;
  private _token?: string;

  constructor(tokenName: string, signOption: JwtSignOptions) {
    this._tokenName = tokenName;
    this._signOption = signOption;
  }

  expireAtInMs(): number {
    if (!this._signOption.expiresIn) {
      throw InternalServerException('Token expiration time is not defined');
    }

    return typeof this._signOption.expiresIn === 'string'
      ? ms(this._signOption.expiresIn)
      : this._signOption.expiresIn * 1000;
  }

  expireAtInSec(): number {
    return this.expireAtInMs() / 1000;
  }

  get tokenName(): string {
    return this._tokenName;
  }

  get signOption(): JwtSignOptions {
    return this._signOption;
  }

  get token(): string {
    if (!this._token) {
      throw InternalServerException('Token is not defined');
    }

    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  static from(tokenName: string, signOption: JwtSignOptions): Token {
    return new Token(tokenName, signOption);
  }
}
