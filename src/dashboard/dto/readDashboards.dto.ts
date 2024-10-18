import { Exclude, Expose } from 'class-transformer';
import { Dashboard } from '../dashboards.model';

export class ReadDashboardsDto {
  @Exclude()
  private _cursor: number;

  @Exclude()
  private _numberOfDashboards: number;

  @Exclude()
  private _dashboards: Dashboard[];

  constructor(dashboards: Dashboard[]) {
    this._dashboards = dashboards;
    this._cursor = dashboards.length > 0 ? dashboards[dashboards.length - 1].id : null;
    this._numberOfDashboards = dashboards.length;
  }

  @Expose()
  get cursor(): number {
    return this._cursor;
  }

  @Expose()
  get numberOfDashboards(): number {
    return this._numberOfDashboards;
  }

  @Expose()
  get dashboards(): Dashboard[] {
    return this._dashboards;
  }
}
