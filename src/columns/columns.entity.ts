import { Base, BaseEntity } from '../common/entity';

export interface Column extends Base {
  name: string;
  position: number;
  dashboardId: number;
}

export class ColumnEntity extends BaseEntity implements Column {
  private _name: string;
  private _position: number;
  private _dashboardId: number;

  constructor(param: Column) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._name = param.name;
    this._position = param.position;
    this._dashboardId = param.dashboardId;
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
}
