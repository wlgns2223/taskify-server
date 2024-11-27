import { Exclude, Expose } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class OffsetPaginationResponseDto<T> {
  @Exclude()
  private _data: T[];

  @Exclude()
  private _currentPage: number;

  @Exclude()
  private _totalNumberOfData: number;

  @Exclude()
  private _totalPage: number;

  constructor(param: { data: T[]; totalNumberOfData: number; currentPage: number; pageSize: number }) {
    this._data = param.data;
    this._totalNumberOfData = param.totalNumberOfData;
    this._currentPage = param.currentPage;
    this._totalPage = Math.ceil(this._totalNumberOfData / param.pageSize);
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
  page: number;

  @IsInt()
  @Min(1)
  pageSize: number;
}
