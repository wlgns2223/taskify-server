import { Base, BaseEntity } from '../common/entity';

export interface Todo extends Base {
  assigneeUserId: number;
  assignerUserId: number;
  columnId: number;
  title: string;
  content: string;
  dueDate: Date;
  imageUrl?: string | null;
  position: number;
}

export class TodoEntity extends BaseEntity implements Todo {
  private _assigneeUserId: number;
  private _assignerUserId: number;
  private _columnId: number;
  private _title: string;
  private _content: string;
  private _dueDate: Date;
  private _imageUrl?: string | null;
  private _position: number;

  constructor(param: Todo) {
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
    this._imageUrl = param.imageUrl ?? null;
    this._position = param.position;
  }

  get assigneeUserId() {
    return this._assigneeUserId;
  }

  get assignerUserId() {
    return this._assignerUserId;
  }

  get columnId() {
    return this._columnId;
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }

  get dueDate() {
    return this._dueDate;
  }

  get imageUrl(): string | undefined | null {
    return this._imageUrl;
  }

  get position() {
    return this._position;
  }

  set assigneeUserId(assigneeUserId: number) {
    this._assigneeUserId = assigneeUserId;
  }

  set assignerUserId(assignerUserId: number) {
    this._assignerUserId = assignerUserId;
  }

  set columnId(columnId: number) {
    this._columnId = columnId;
  }

  set title(title: string) {
    this._title = title;
  }

  set content(content: string) {
    this._content = content;
  }

  set dueDate(dueDate: Date) {
    this._dueDate = dueDate;
  }

  set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  set position(position: number) {
    this._position = position;
  }
}
