import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export interface OffsetPaginationResponse<T = any> {
  data: T[];
  totalNumberOfData: number;
  currentPage: number;
  pageSize: number;
}

export class OffsetPaginationResponseDto<T = any> implements OffsetPaginationResponse {
  @Exclude()
  private _data: T[];

  @Exclude()
  private _currentPage: number;

  @Exclude()
  private _totalNumberOfData: number;

  @Exclude()
  private _totalPage: number;

  constructor(param: OffsetPaginationResponse) {
    this._data = param.data;
    this._totalNumberOfData = param.totalNumberOfData;
    this._currentPage = param.currentPage;
    this._totalPage = Math.ceil(this._totalNumberOfData / param.pageSize);
  }

  @Exclude()
  get pageSize(): number {
    return this._data.length;
  }

  @Expose()
  get totalNumberOfData(): number {
    return this._totalNumberOfData;
  }

  @Expose()
  get data(): T[] {
    return this._data;
  }

  @Expose()
  get totalPage(): number {
    return this._totalPage;
  }

  @Expose()
  get currentPage(): number {
    return this._currentPage;
  }

  @Expose()
  get hasNextPage(): boolean {
    return this._currentPage < this._totalPage;
  }

  @Expose()
  get hasPrevPage(): boolean {
    return this._currentPage > 1;
  }
}

export class OffsetPaginationRequestDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize: number;
}
