import { instanceToPlain } from 'class-transformer';
import { Column, ColumnEntity } from './columns.entity';
import { ColumnDTO } from './dto/column.dto';

export class ColumnsMapper {
  static toEntity(column: Column): ColumnEntity {
    return ColumnEntity.from<ColumnEntity, Column>(ColumnEntity, column);
  }

  static toEntityList(columns: Column[]): ColumnEntity[] {
    return columns.map((column) => this.toEntity(column));
  }

  static toDTO(column: ColumnEntity | null) {
    if (!column) {
      return null;
    }
    const dto = ColumnDTO.from(ColumnDTO, column);

    return instanceToPlain(dto) as ColumnDTO;
  }

  static toDTOList(columns: ColumnEntity[]) {
    return columns.map((column) => {
      const dto = ColumnDTO.from(ColumnDTO, column);
      return instanceToPlain(dto) as ColumnDTO;
    });
  }
}
