import { Exclude, Expose } from 'class-transformer';
import { BaseDTO } from '../../common/dto';
import { InternalServerException } from '../../common/exceptions/exceptions';
import { DashboardEntity } from '../dashboards.entity';

export class DashboardDTO extends BaseDTO {
  @Exclude()
  private _title: string;

  @Exclude()
  private _color: string;

  @Exclude()
  private _ownerId: number;

  constructor(dashboard: DashboardEntity) {
    if (!dashboard.id || !dashboard.createdAt || !dashboard.updatedAt) {
      throw InternalServerException('DashboardDTO.constructor: invalid dashboard entity');
    }
    super({
      id: dashboard.id,
      createdAt: dashboard.createdAt,
      updatedAt: dashboard.updatedAt,
    });

    this._title = dashboard.title;
    this._color = dashboard.color;
    this._ownerId = dashboard.ownerId;
  }

  @Expose()
  get title() {
    return this._title;
  }

  @Expose()
  get color() {
    return this._color;
  }

  @Expose()
  get ownerId() {
    return this._ownerId;
  }
}
