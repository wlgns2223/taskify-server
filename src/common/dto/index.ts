import { Exclude, Expose } from 'class-transformer';
import { TIMESTAMP } from '../types';
import { Base, BaseEntity } from '../entity';

export abstract class BaseDTO implements Required<Base> {
  @Exclude()
  protected _id: number;

  @Exclude()
  protected _createdAt: TIMESTAMP;

  @Exclude()
  protected _updatedAt: TIMESTAMP;

  constructor(param: Required<Base>) {
    this._id = param.id;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get createdAt(): TIMESTAMP {
    return this._createdAt;
  }

  @Expose()
  get updatedAt(): TIMESTAMP {
    return this._updatedAt;
  }

  static from<T extends BaseDTO, P extends Base>(cls: new (props: P) => T, json: P): T {
    return new cls(json);
  }
}
