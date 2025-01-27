import { Column, ColumnEntity } from './columns.entity';

export class ColumnsMapper {
  static toEntity(column: Column): ColumnEntity {
    return ColumnEntity.from<ColumnEntity, Column>(ColumnEntity, column);
  }

  static toEntityList(columns: Column[]): ColumnEntity[] {
    return columns.map((column) => this.toEntity(column));
  }
}
