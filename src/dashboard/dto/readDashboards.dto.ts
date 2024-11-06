import { Exclude, Expose } from 'class-transformer';
import { Dashboard } from '../dashboards.model';
import { CursorPaginationDirection } from '../dashboards.repository';
import { match } from 'ts-pattern';

export class ReadDashboardsDto {
  @Exclude()
  private _cursor: {
    next: number;
    prev: number;
  };

  @Exclude()
  private _totalNumberOfData: number;

  @Exclude()
  private _dashboards: Dashboard[];

  constructor(
    dashboards: Dashboard[],
    cursors: { firstCursor: number; lastCursor: number },
    totalNumberOfData: number,
  ) {
    this._dashboards = dashboards;
    this._totalNumberOfData = totalNumberOfData;

    this._cursor = match(dashboards.length)
      .with(0, () => ({
        next: null,
        prev: null,
      }))
      .otherwise(() => {
        const isLastPage = dashboards[dashboards.length - 1].id === cursors.lastCursor;
        const isFirstPage = dashboards[0].id === cursors.firstCursor;

        return {
          next: isLastPage ? null : dashboards[dashboards.length - 1].id,
          prev: isFirstPage ? null : dashboards[0].id,
        };
      });
  }

  @Expose()
  get cursor(): {
    next: number;
    prev: number;
  } {
    return this._cursor;
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
