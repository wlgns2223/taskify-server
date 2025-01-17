import { instanceToPlain, plainToInstance } from 'class-transformer';

export class TodoTag {
  private _id: number;
  private _todoId: number;
  private _tagId: number;

  constructor(param: { id?: number; todoId: number; tagId: number }) {
    this._id = param.id;
    this._todoId = param.todoId;
    this._tagId = param.tagId;
  }

  get id() {
    return this._id;
  }

  get todoId() {
    return this._todoId;
  }

  get tagId() {
    return this._tagId;
  }

  toJSON() {
    return instanceToPlain(this);
  }

  static from(data: { todoId: number; tagId: number }) {
    if (!data.todoId || !data.tagId) {
      throw new Error('TodoTag must have a todoId and tagId');
    }

    return new TodoTag(data);
  }
}
