import { Base, BaseEntity } from '../common/entity';

export interface RefreshToken extends Base {
  userId: number;
  token: string;
  expiresAt: number;
}

export class RefreshTokenEntity extends BaseEntity implements RefreshToken {
  private _userId: number;
  private _token: string;
  private _expiresAt: number;

  constructor(param: RefreshToken) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });

    this._userId = param.userId;
    this._token = param.token;
    this._expiresAt = param.expiresAt;
  }

  get userId() {
    return this._userId;
  }

  get token() {
    return this._token;
  }

  get expiresAt(): number {
    return this._expiresAt;
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  set token(token: string) {
    this._token = token;
  }

  set expiresAt(expiresAt: number) {
    this._expiresAt = expiresAt;
  }
}
