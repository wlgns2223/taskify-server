import { Base, BaseEntity } from '../common/entity';

export interface Column extends Base {
  name: string;
  dashboardId: number;
  position?: number;
}

const DEFAULT_POSITION = 0;

export class ColumnEntity extends BaseEntity implements Column {
  private _name: string;
  private _dashboardId: number;
  private _position?: number;

  constructor(param: Column) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._name = param.name;
    this._position = param.position ?? DEFAULT_POSITION;
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
