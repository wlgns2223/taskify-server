import { Base, BaseEntity } from '../common/entity';
import { User } from '../users/users.entity';

export interface Comment extends Base {
  writerId: number;
  comment: string;
  todoId: number;
  parentId: number | null;
  ref?: number;
  refOrder?: number;
  replyCount?: number;
  step?: number;
  writer?: User;
}

export class CommentEntity extends BaseEntity {
  private _writerId: number;
  private _comment: string;
  private _todoId: number;
  private _parentId: number | null;
  private _ref?: number;
  private _refOrder?: number;
  private _replyCount?: number;
  private _step?: number;
  private _writer?: User;

  constructor(data: Comment) {
    super({
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      id: data.id,
    });

    this._writerId = data.writerId;
    this._comment = data.comment;
    this._todoId = data.todoId;
    this._parentId = data.parentId;
    this._ref = data.ref;
    this._refOrder = data.refOrder;
    this._replyCount = data.replyCount;
    this._step = data.step;
    this._writer = data.writer;
  }

  get writerId(): number {
    return this._writerId;
  }

  get comment(): string {
    return this._comment;
  }

  get todoId(): number {
    return this._todoId;
  }

  get parentId(): number | null {
    return this._parentId;
  }

  get ref(): number | undefined {
    return this._ref;
  }

  get refOrder(): number | undefined {
    return this._refOrder;
  }

  get replyCount(): number | undefined {
    return this._replyCount;
  }

  get step(): number | undefined {
    return this._step;
  }

  get writer(): User | undefined {
    return this._writer;
  }
}
