export class Dashboard {
  private _id: number;
  private _title: string;
  private _color: string;
  private _ownerId: number;
  private _createdAt: string;
  private _updatedAt: string;

  constructor(title: string, color: string, ownerId: number, id?: number, createdAt?: string, updatedAt?: string) {
    this._id = id;
    this._title = title;
    this._color = color;
    this._ownerId = ownerId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get color() {
    return this._color;
  }

  get ownerId() {
    return this._ownerId;
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

  set title(title: string) {
    this._title = title;
  }

  set color(color: string) {
    this._color = color;
  }

  set ownerId(ownerId: number) {
    this._ownerId = ownerId;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: string) {
    this._updatedAt = updatedAt;
  }

  static from(data: any) {
    return new Dashboard(data.title, data.color, data.ownerId, data.id, data.createdAt, data.updatedAt);
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      color: this._color,
      ownerId: this._ownerId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
