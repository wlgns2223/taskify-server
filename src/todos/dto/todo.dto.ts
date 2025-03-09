import { Exclude, Expose, Type } from 'class-transformer';
import { Todo } from '../todos.entity';
import { BaseDTO } from '../../common/dto';
import { InternalServerException } from '../../common/exceptions/exceptions';
import { Tag } from '../../tags/tag.entity';
import { TagDTO } from '../../tags/dto/tag.dto';
import { UserDTO } from '../../users/dto/user.dto';
import { User } from '../../users/users.entity';

type ITodoDTO = Required<Omit<Todo, 'imageUrl' | 'position'>> & { imageUrl?: string | null; position?: number | null };

export class TodoDTO extends BaseDTO implements ITodoDTO {
  @Exclude()
  private _assigneeUserId: number;

  @Exclude()
  private _assignerUserId: number;

  @Exclude()
  private _columnId: number;

  @Exclude()
  private _title: string;

  @Exclude()
  private _content: string;

  @Exclude()
  private _dueDate: Date;

  @Exclude()
  private _imageUrl?: string | null;

  @Exclude()
  private _position?: number | null;

  @Exclude()
  private _tags: Tag[];

  @Exclude()
  private _assignee: User;

  constructor(param: Todo) {
    if (!param.id || !param.createdAt || !param.updatedAt) {
      throw InternalServerException('ColumnDTO.constructor: invalid column entity');
    }

    if (!param.assignee) {
      throw InternalServerException('TodoDTO.constructor: invalid assignee entity');
    }

    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._assigneeUserId = param.assigneeUserId;
    this._assignerUserId = param.assignerUserId;
    this._columnId = param.columnId;
    this._title = param.title;
    this._content = param.content;
    this._dueDate = param.dueDate;
    this._imageUrl = param.imageUrl;
    this._position = param.position;
    this._tags = param.tags ?? [];
    this._assignee = param.assignee;
  }

  @Expose()
  @Type(() => UserDTO)
  get assignee() {
    return this._assignee;
  }

  @Expose()
  @Type(() => TagDTO)
  get tags() {
    return this._tags;
  }

  @Expose()
  get assigneeUserId() {
    return this._assigneeUserId;
  }

  @Expose()
  get assignerUserId() {
    return this._assignerUserId;
  }

  @Expose()
  get columnId() {
    return this._columnId;
  }

  @Expose()
  get title() {
    return this._title;
  }

  @Expose()
  get content() {
    return this._content;
  }

  @Expose()
  get dueDate() {
    return this._dueDate;
  }

  @Expose()
  get imageUrl() {
    return this._imageUrl;
  }

  @Expose()
  get position() {
    return this._position;
  }
}
