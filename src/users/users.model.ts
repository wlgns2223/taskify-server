export class User {
  private _id: number;
  private _email: string;
  private _nickname: string;
  private _password: string;
  private _updatedAt: string;
  private _createdAt: string;

  constructor(email: string, nickname: string, password: string) {
    this._email = email;
    this._nickname = nickname;
    this._password = password;
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

  set updatedAt(updatedAt: string) {
    this._updatedAt = updatedAt;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }
}
