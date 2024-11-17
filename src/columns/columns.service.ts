import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnsDto } from './dto/createColumns.dto';
import { Column } from './columns.model';
import { UpdateColumnsDto } from './dto/updateColumns.dto';

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

  async updateColumn(columnId: string, columnDto: Column) {
    const column = new Column({
      id: columnDto.id,
      name: columnDto.name,
      position: columnDto.position,
      dashboardId: columnDto.dashboardId,
      createdAt: columnDto.createdAt,
      updatedAt: columnDto.updatedAt,
    });
    return await this.columnsRepository.updateColumn(columnId, column);
  }

  async deleteAndReorderColumns(dashboardId: number, columnId: number) {
    return await this.columnsRepository.deleteAndReorderColumns(dashboardId, columnId);
  }
}
