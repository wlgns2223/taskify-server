import { Exclude, Expose } from 'class-transformer';
import { Dashboard } from '../dashboards.model';
import { CursorPaginationDirection } from '../dashboards.repository';
import { match } from 'ts-pattern';

export class ReadDashboardsDto {
  @Exclude()
  private _previousOffset: number;

  @Exclude()
  private _totalNumberOfData: number;

  @Exclude()
  private _dashboards: Dashboard[];

  constructor(param: { dashboards: Dashboard[]; previousOffset: number; totalNumberOfData: number }) {
    this._dashboards = param.dashboards;
    this._totalNumberOfData = param.totalNumberOfData;
    this._previousOffset = param.previousOffset;
  }

  @Expose()
  get previousOffset(): number {
    return this._previousOffset;
  }

  @Expose()
  get totalNumberOfData(): number {
    return this._totalNumberOfData;
  }

  @Expose()
  get dashboards(): Dashboard[] {
    return this._dashboards;
  }
}
