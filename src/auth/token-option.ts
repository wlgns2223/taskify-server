import { JwtSignOptions } from '@nestjs/jwt';
import ms from 'ms';

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

  get expiresIn(): string {
    return this._signOptions.expiresIn as string;
  }

  expiresInByDate(): Date {
    const expiresInMs = ms(this._signOptions.expiresIn as string);
    return new Date(Date.now() + expiresInMs);
  }

  expiresInBySeconds(): number {
    const expiresInMs = ms(this._signOptions.expiresIn as string);
    return Math.floor((Date.now() + expiresInMs) / 1000);
  }

  toJwtSignOptions(): JwtSignOptions {
    return this._signOptions;
  }

  static from(signOptions: JwtSignOptions): TokenConfig {
    return new TokenConfig(signOptions);
  }
}
