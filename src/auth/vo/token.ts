import { JwtSignOptions } from '@nestjs/jwt';
import ms from 'ms';
import { InternalServerException } from '../../common/exceptions/exceptions';

export interface Token {
  tokenName: string;
  signOption: JwtSignOptions;
  token: string;
}

export class TokenVO implements Token {
  private readonly _tokenName: string;
  private readonly _signOption: JwtSignOptions;
  private readonly _token: string;

  constructor(param: Token) {
    const { signOption, tokenName, token } = param;
    this._tokenName = tokenName;
    this._signOption = signOption;
    this._token = token;
  }

  public expireAtInMs(): number {
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
    return this._token;
  }

  static from(param: Token): TokenVO {
    return new TokenVO(param);
  }
}
