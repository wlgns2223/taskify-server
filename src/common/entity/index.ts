export interface Base {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseEntity implements Base {
  protected _id?: number;

  protected _createdAt?: Date;

  protected _updatedAt?: Date;

  constructor(param: Base) {
    this._id = param.id;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  get id(): number | undefined {
    return this._id;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set id(id: number | undefined) {
    this._id = id;
  }

  set createdAt(createdAt: Date | undefined) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: Date | undefined) {
    this._updatedAt = updatedAt;
  }

  static from<T extends BaseEntity, P extends Base>(cls: new (props: P) => T, json: P): T {
    return new cls(json);
  }
}
