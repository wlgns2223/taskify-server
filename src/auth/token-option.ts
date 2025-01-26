import { JwtSignOptions } from '@nestjs/jwt';
import ms from 'ms';
import { InternalServerException } from '../common/exceptions/exceptions';

export class TokenConfig {
  private _signOptions: JwtSignOptions;
  private _token: string;

  constructor(signOptions: JwtSignOptions) {
    this._signOptions = signOptions;
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  get expiresIn() {
    return this._signOptions.expiresIn;
  }

  get expiresInMs(): number {
    if (!this._signOptions.expiresIn) {
      throw InternalServerException('Token expiration time is not defined');
    }
    return typeof this._signOptions.expiresIn === 'string'
      ? ms(this._signOptions.expiresIn)
      : this._signOptions.expiresIn * 1000;
  }

  get expiresInSec(): number {
    return this.expiresInMs / 1000;
  }

  toJwtSignOptions(): JwtSignOptions {
    return this._signOptions;
  }

  static from(signOptions: JwtSignOptions): TokenConfig {
    return new TokenConfig(signOptions);
  }
}
