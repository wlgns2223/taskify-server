import { instanceToPlain, plainToInstance } from 'class-transformer';

type TTodo = {
  id?: number;
  assigneeUserId: number;
  assignerUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  content: string;
  dueDate: Date;
  imageUrl?: string;
  position: number;
  createdAt?: string;
  updatedAt?: string;
};

export class Todo {
  private _id: number;
  private _assigneeUserId: number;
  private _assignerUserId: number;
  private _dashboardId: number;
  private _columnId: number;
  private _title: string;
  private _content: string;
  private _dueDate: Date;
  private _imageUrl: string;
  private _position: number;
  private _createdAt: string;
  private _updatedAt: string;

  constructor(param: TTodo) {
    this._id = param.id;
    this._assigneeUserId = param.assigneeUserId;
    this._assignerUserId = param.assignerUserId;
    this._dashboardId = param.dashboardId;
    this._columnId = param.columnId;
    this._title = param.title;
    this._content = param.content;
    this._dueDate = param.dueDate;
    this._imageUrl = param.imageUrl;
    this._position = param.position;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  get id() {
    return this._id;
  }

  get assigneeUserId() {
    return this._assigneeUserId;
  }

  get assignerUserId() {
    return this._assignerUserId;
  }

  get dashboardId() {
    return this._dashboardId;
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

  get imageUrl() {
    return this._imageUrl;
  }

  get position() {
    return this._position;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set id(id: number) {
    this._id = id;
  }

  set assigneeUserId(assigneeUserId: number) {
    this._assigneeUserId = assigneeUserId;
  }

  set assignerUserId(assignerUserId: number) {
    this._assignerUserId = assignerUserId;
  }

  set dashboardId(dashboardId: number) {
    this._dashboardId = dashboardId;
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

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: string) {
    this._updatedAt = updatedAt;
  }

  toJSON() {
    // return {
    //   id: this.id,
    //   assigneeUserId: this.assigneeUserId,
    //   assignerUserId: this.assignerUserId,
    //   dashboardId: this.dashboardId,
    //   columnId: this.columnId,
    //   title: this.title,
    //   content: this.content,
    //   dueDate: this.dueDate,
    //   imageUrl: this.imageUrl,
    //   position: this.position,
    //   createdAt: this.createdAt,
    //   updatedAt: this.updatedAt,
    // };
    return instanceToPlain(this);
  }

  static from(data: TTodo) {
    return new Todo(data);
  }
}
