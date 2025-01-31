import { Exclude, Expose } from 'class-transformer';
import { BaseDTO } from '../../common/dto';
import { Column, ColumnEntity } from '../columns.entity';
import { InternalServerException } from '../../common/exceptions/exceptions';

export class ColumnDTO extends BaseDTO implements Required<Column> {
  @Exclude()
  private readonly _name: string;

  @Exclude()
  private readonly _position: number;

  @Exclude()
  private readonly _dashboardId: number;
  constructor(column: ColumnEntity) {
    if (!column.id || !column.createdAt || !column.updatedAt) {
      throw InternalServerException('ColumnDTO.constructor: invalid column entity');
    }

    if (column.position === undefined) {
      throw InternalServerException('ColumnDTO.constructor: invalid column entity');
    }

    super({
      id: column.id,
      createdAt: column.createdAt,
      updatedAt: column.updatedAt,
    });
    this._name = column.name;
    this._position = column.position;
    this._dashboardId = column.dashboardId;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get position(): number {
    return this._position;
  }

  @Expose()
  get dashboardId(): number {
    return this._dashboardId;
  }
}
