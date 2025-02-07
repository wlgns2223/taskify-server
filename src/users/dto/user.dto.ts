import { Exclude, Expose } from 'class-transformer';
import { User } from '../users.entity';
import { BaseDTO } from '../../common/dto';
import { InternalServerException } from '../../common/exceptions/exceptions';

export class UserDTO extends BaseDTO implements Required<User> {
  @Exclude()
  private _email: string;
  @Exclude()
  private _nickname: string;
  @Exclude()
  private _password: string;

  constructor(user: User) {
    if (!user.id || !user.createdAt || !user.updatedAt) {
      throw InternalServerException('UserDTO.constructor: invalid user entity');
    }

    super({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    this._email = user.email;
    this._nickname = user.nickname;
    this._password = user.password;
  }

  @Expose()
  get email() {
    return this._email;
  }

  @Expose()
  get nickname() {
    return this._nickname;
  }

  @Exclude()
  get password() {
    return this._password;
  }
}
