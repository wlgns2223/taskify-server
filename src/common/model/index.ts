import { instanceToPlain } from 'class-transformer';
import { Serialized } from '../types';

export interface BaseModelProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseModel {
  protected _id?: string;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  constructor(param: BaseModelProperties) {
    this._id = param.id;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  get id(): string | undefined {
    return this._id;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set id(id: string | undefined) {
    this._id = id;
  }

  set createdAt(createdAt: Date | undefined) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: Date | undefined) {
    this._updatedAt = updatedAt;
  }

  serialize<T = unknown>(): Serialized<T> {
    return instanceToPlain(this) as Serialized<T>;
  }

  static from<T extends BaseModel, P extends BaseModelProperties>(cls: new (props: P) => T, json: P): T {
    return new cls(json);
  }
}
