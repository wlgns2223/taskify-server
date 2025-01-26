import { Exclude, Expose } from 'class-transformer';
import { Todo } from '../todos.entity';

export class TodoDTO implements Todo {
  @Exclude()
  private _id?: number;

  @Exclude()
  private _createdAt?: Date;

  @Exclude()
  private _updatedAt?: Date;

  @Exclude()
  private _assigneeUserId: number;

  @Exclude()
  private _assignerUserId: number;

  @Exclude()
  private _dashboardId: number;

  @Exclude()
  private _columnId: number;

  @Exclude()
  private _title: string;

  @Exclude()
  private _content: string;

  @Exclude()
  private _dueDate: Date;

  @Exclude()
  private _imageUrl?: string;

  @Exclude()
  private _position: number;

  constructor(param: Todo) {
    this._id = param.id;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
    this._assigneeUserId = param.assigneeUserId;
    this._assignerUserId = param.assignerUserId;
    this._dashboardId = param.dashboardId;
    this._columnId = param.columnId;
    this._title = param.title;
    this._content = param.content;
    this._dueDate = param.dueDate;
    this._imageUrl = param.imageUrl;
    this._position = param.position;
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get createdAt() {
    return this._createdAt;
  }

  @Expose()
  get updatedAt() {
    return this._updatedAt;
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
  get dashboardId() {
    return this._dashboardId;
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

  static from(todo: Todo) {
    return new TodoDTO(todo);
  }
}
