import { Base, BaseEntity } from '../common/entity';

export interface Dashboard extends Base {
  title: string;
  color: string;
  ownerId: number;
}

export class DashboardEntity extends BaseEntity implements Dashboard {
  private _title: string;
  private _color: string;
  private _ownerId: number;

  constructor(param: Dashboard) {
    super({
      id: param.id,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
    });
    this._title = param.title;
    this._color = param.color;
    this._ownerId = param.ownerId;
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
}
