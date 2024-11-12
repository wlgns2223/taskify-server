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

  async getColumnsByDashboardId(dashboardId: number) {
    return await this.columnsRepository.getColumnsByDashboardId(dashboardId);
  }

  async swapColumnsPosition(dashboardId: number, from: number, to: number) {
    return await this.columnsRepository.swapColumnsPosition(dashboardId, from, to);
  }
}
