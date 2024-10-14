export class User {
  private _id: number;
  private _email: string;
  private _nickname: string;
  private _password: string;
  private _updatedAt: string;
  private _createdAt: string;
  private _teamId: string;

  constructor(
    email: string,
    nickname: string,
    password: string,
    teamId: string,
    id?: number,
    createdAt?: string,
    updatedAt?: string,
  ) {
    this._id = id;
    this._email = email;
    this._nickname = nickname;
    this._password = password;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._teamId = teamId;
  }

  get teamId() {
    return this._teamId;
  }

  get id() {
    return this._id;
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
  get updatedAt() {
    return this._updatedAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  set id(id: number) {
    this._id = id;
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

  set updatedAt(updatedAt: string) {
    this._updatedAt = updatedAt;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  set teamId(teamId: string) {
    this._teamId = teamId;
  }

  toJSON() {
    return {
      id: this._id,
      email: this._email,
      nickname: this._nickname,
      password: this._password,
      updatedAt: this._updatedAt,
      createdAt: this._createdAt,
      teamId: this._teamId,
    };
  }

  static from(data: User): User {
    return new User(data.email, data.nickname, data.password, data.teamId, data.id, data.createdAt, data.updatedAt);
  }

  public comparePassword(password: string): boolean {
    return this._password === password;
  }
}
