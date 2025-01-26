import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { User } from '../users.entity';

export class UserDTO {
  @Exclude()
  private _id?: number;
  @Exclude()
  private _email: string;
  @Exclude()
  private _nickname: string;
  @Exclude()
  private _createdAt?: Date;
  @Exclude()
  private _updatedAt?: Date;

  constructor(data: User) {
    this._id = data.id;
    this._email = data.email;
    this._nickname = data.nickname;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get email() {
    return this._email;
  }

  @Expose()
  get nickname() {
    return this._nickname;
  }

  @Expose()
  get createdAt() {
    return this._createdAt;
  }

  @Expose()
  get updatedAt() {
    return this._updatedAt;
  }

  static from(user: User) {
    return new UserDTO(user);
  }
}
