export class Token {
  private _tokenName: string;
  private _expiresIn: {
    timeInMs: number;
    timeInSec: string;
  };

  private _token: string;

  constructor(
    tokenName: string,
    expiresIn: {
      timeInMs: number;
      timeInSec: string;
    },
  ) {
    this._tokenName = tokenName;
    this._expiresIn = expiresIn;
  }

  get tokenName() {
    return this._tokenName;
  }

  get expiresTime() {
    return this._expiresIn;
  }

  get token() {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }
}
