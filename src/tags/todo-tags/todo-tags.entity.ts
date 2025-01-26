import { Base, BaseEntity } from '../../common/entity';

export interface TodoTag extends Base {
  todoId: number;
  tagId: number;
}

export class TodoTagEntity extends BaseEntity implements TodoTag {
  private _todoId: number;
  private _tagId: number;

  constructor(param: TodoTag) {
    super({ id: param.id, createdAt: param.createdAt, updatedAt: param.updatedAt });
    this._todoId = param.todoId;
    this._tagId = param.tagId;
  }

  get todoId() {
    return this._todoId;
  }

  get tagId() {
    return this._tagId;
  }
}
