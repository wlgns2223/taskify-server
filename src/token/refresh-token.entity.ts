import { Base, BaseEntity } from '../common/entity';

export interface RefreshToken extends Base {
  userId: number;
  token: string;
  exp: number;
}

export class RefreshTokenEntity extends BaseEntity implements RefreshToken {
  private _userId: number;
  private _token: string;
  private _exp: number;

  constructor(param: RefreshToken) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });

    this._userId = param.userId;
    this._token = param.token;
    this._exp = param.exp;
  }

  get userId() {
    return this._userId;
  }

  get token() {
    return this._token;
  }

  get exp() {
    return this._exp;
  }
}
