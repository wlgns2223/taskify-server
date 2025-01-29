import { TIMESTAMP } from '../types';

export interface Base {
  id?: number;
  createdAt?: TIMESTAMP;
  updatedAt?: TIMESTAMP;
}

export abstract class BaseEntity implements Base {
  protected _id?: number;

  protected _createdAt?: TIMESTAMP;

  protected _updatedAt?: TIMESTAMP;

  constructor(param: Base) {
    this._id = param.id;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  get id(): number | undefined {
    return this._id;
  }

  get createdAt(): TIMESTAMP | undefined {
    return this._createdAt;
  }

  get updatedAt(): TIMESTAMP | undefined {
    return this._updatedAt;
  }

  set id(id: number | undefined) {
    this._id = id;
  }

  set createdAt(createdAt: TIMESTAMP | undefined) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: TIMESTAMP | undefined) {
    this._updatedAt = updatedAt;
  }

  static from<T extends BaseEntity, P extends Base>(cls: new (props: P) => T, json: P): T {
    return new cls(json);
  }
}
