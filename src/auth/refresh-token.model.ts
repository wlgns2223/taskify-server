export class RefreshToken {
  private _id: number;
  private _userId: number;
  private _token: string;
  private _expiresAt: string;
  private _createdAt: string;
  private _updatedAt: string;

  constructor(
    userId: number,
    token: string,
    expiresAt: string,
    id?: number,
    createdAt?: string,
    updatedAt?: string,
  ) {
    this._id = id;
    this._userId = userId;
    this._token = token;
    this._expiresAt = expiresAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get token() {
    return this._token;
  }

  get expiresAt() {
    return this._expiresAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
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
