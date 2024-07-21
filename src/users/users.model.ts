export class User {
  private _id: number;
  private _email: string;
  private _nickname: string;
  private _password: string;
  private _updatedAt: string;
  private _createdAt: string;

  constructor(
    email: string,
    nickname: string,
    password: string,
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

  toJSON() {
    return {
      id: this._id,
      email: this._email,
      nickname: this._nickname,
      password: this._password,
      updatedAt: this._updatedAt,
      createdAt: this._createdAt,
    };
  }

  static from(data: User): User {
    return new User(
      data.email,
      data.nickname,
      data.password,
      data.id,
      data.createdAt,
      data.updatedAt,
    );
  }

  public comparePassword(password: string): boolean {
    return this._password === password;
  }
}
