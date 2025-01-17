import { instanceToPlain, plainToInstance } from 'class-transformer';

interface ITag {
  id?: number;
  tag: string;
  createdAt?: Date;
}

export class Tag {
  private _id: number;
  private _tag: string;
  private _createdAt: Date;

  constructor(param: ITag) {
    this._id = param.id;
    this._tag = param.tag;
    this._createdAt = param.createdAt;
  }

  get id() {
    return this._id;
  }

  get tag() {
    return this._tag;
  }

  get createdAt() {
    return this._createdAt;
  }

  toJSON() {
    return instanceToPlain(this);
  }

  static from(data: ITag) {
    if (!data.tag) {
      throw new Error('Tag must have a tag');
    }

    return new Tag(data);
  }
}
