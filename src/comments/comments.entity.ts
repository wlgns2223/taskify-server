import { Base, BaseEntity } from '../common/entity';
import { User } from '../users/users.entity';

export interface Comment extends Base {
  writerId: number;
  comment: string;
  todoId: number;
  parentCommentId: number | null;
  writer?: User;
  replies?: Comment[];
}

export class CommentEntity extends BaseEntity implements Comment {
  private _writerId: number;
  private _comment: string;
  private _todoId: number;
  private _parentCommentId: number | null;
  private _writer?: User;
  private _replies?: Comment[];

  constructor(param: Comment) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._writerId = param.writerId;
    this._comment = param.comment;
    this._todoId = param.todoId;
    this._parentCommentId = param.parentCommentId;
    this._writer = param.writer;
    this._replies = param.replies;
  }

  get writer(): User | undefined {
    return this._writer;
  }

  get replies(): Comment[] | undefined {
    return this._replies;
  }

  get writerId() {
    return this._writerId;
  }

  get comment() {
    return this._comment;
  }

  get todoId() {
    return this._todoId;
  }

  get parentCommentId() {
    return this._parentCommentId;
  }
}
