import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnsDto } from './dto/createColumns.dto';
import { Column } from './columns.model';

@Injectable()
export class ColumnsService {
  constructor(private columnsRepository: ColumnsRepository) {}

  async createColumn(columnDto: CreateColumnsDto) {
    const newColumn = new Column({ ...columnDto });
    return await this.columnsRepository.createColumn(newColumn);
  }
}
