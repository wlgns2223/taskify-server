import { Exclude, Expose } from 'class-transformer';
import { BaseDTO } from '../../common/dto';
import { Comment } from '../comments.entity';
import { User } from '../../users/users.entity';
import { InternalServerException } from '../../common/exceptions/exceptions';

export class CommentDTO extends BaseDTO implements Required<Comment> {
  @Exclude()
  private _writerId: number;

  @Exclude()
  private _comment: string;

  @Exclude()
  private _todoId: number;

  @Exclude()
  private _parentId: number | null;

  @Exclude()
  private _ref: number;

  @Exclude()
  private _refOrder: number;

  @Exclude()
  private _replyCount: number;

  @Exclude()
  private _step: number;

  @Exclude()
  private _writer: User;

  constructor(param: Comment) {
    if (!param.id || !param.createdAt || !param.updatedAt) {
      throw InternalServerException('CommentDTO.constructor: invalid column entity');
    }

    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });

    this._writerId = param.writerId;
    this._comment = param.comment;
    this._todoId = param.todoId;
    this._parentId = param.parentId;
    this._ref = param.ref!;
    this._refOrder = param.refOrder!;
    this._replyCount = param.replyCount!;
    this._step = param.step!;
    this._writer = param.writer!;
  }

  @Expose()
  get writerId(): number {
    return this._writerId;
  }

  @Expose()
  get comment(): string {
    return this._comment;
  }

  @Expose()
  get todoId(): number {
    return this._todoId;
  }

  @Expose()
  get parentId(): number | null {
    return this._parentId;
  }

  @Expose()
  get ref(): number {
    return this._ref;
  }

  @Expose()
  get refOrder(): number {
    return this._refOrder;
  }

  @Expose()
  get replyCount(): number {
    return this._replyCount;
  }

  @Expose()
  get step(): number {
    return this._step;
  }

  @Expose()
  get writer(): User {
    return this._writer;
  }
}
