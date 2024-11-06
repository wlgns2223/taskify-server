export class Column {
  private _id: number;
  private _name: string;
  private _position: number;
  private _dashboardId: number;
  private _createdAt: string;
  private _updatedAt: string;

  constructor(param: {
    name: string;
    position: number;
    dashboardId: number;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
  }) {
    this._id = param.id;
    this._name = param.name;
    this._position = param.position;
    this._dashboardId = param.dashboardId;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get position() {
    return this._position;
  }

  get dashboardId() {
    return this._dashboardId;
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

  set name(name: string) {
    this._name = name;
  }

  set position(position: number) {
    this._position = position;
  }

  set dashboardId(dashboardId: number) {
    this._dashboardId = dashboardId;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: string) {
    this._updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      position: this.position,
      dashboardId: this.dashboardId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
