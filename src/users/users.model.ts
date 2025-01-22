import { BaseModel, BaseModelProperties } from '../common/model';

export interface UserProperties extends BaseModelProperties {
  email: string;
  nickname: string;
  password: string;
  teamId: string;
}

export class User extends BaseModel implements UserProperties {
  private _email: string;
  private _nickname: string;
  private _password: string;
  private _teamId: string;

  constructor(param: UserProperties) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._email = param.email;
    this._nickname = param.nickname;
    this._password = param.password;
    this._teamId = param.teamId;
  }

  get teamId() {
    return this._teamId;
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

  set teamId(teamId: string) {
    this._teamId = teamId;
  }

  public comparePassword(password: string): boolean {
    return this._password === password;
  }
}
