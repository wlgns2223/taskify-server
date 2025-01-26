import { Base, BaseEntity } from '../common/entity';

export interface User extends Base {
  email: string;
  nickname: string;
  password: string;
}

export class UserEntity extends BaseEntity implements User {
  private _email: string;

  private _nickname: string;

  private _password: string;

  constructor(param: User) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._email = param.email;
    this._nickname = param.nickname;
    this._password = param.password;
  }

  get email() {
    return this._email;
  }

  get nickname() {
    return this._nickname;
  }

  get password() {
    return this._password;
  }

  set email(email: string) {
    this._email = email;
  }

  set nickname(nickname: string) {
    this._nickname = nickname;
  }

  set password(password: string) {
    this._password = password;
  }

  public comparePassword(password: string): boolean {
    return this._password === password;
  }
}
