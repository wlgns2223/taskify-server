import { Inject, Injectable } from '@nestjs/common';
import { CreateColumnsDto } from '../dto/createColumns.dto';
import { Column } from '../columns.entity';
import { ColumnsService } from './columns.service.provider';
import { ColumnsRepository, ColumnsRepositoryToken } from '../repository';
import { ColumnsMapper } from '../columns.mapper';
import { SwapColumnPositionDto } from '../dto/swapColumnPosition.dto';
import { UpdateColumnsDto } from '../dto/updateColumns.dto';
import { EntityNotFoundException } from '../../common/exceptions/exceptions';

@Injectable()
export class ColumnsServiceImpl implements ColumnsService {
  constructor(
    @Inject(ColumnsRepositoryToken)
    private columnsRepository: ColumnsRepository,
  ) {}

  async create(columnDto: CreateColumnsDto) {
    const newColumn = ColumnsMapper.toEntity(columnDto);
    return await this.columnsRepository.create(newColumn);
  }

  async findAllBy(dashboardId: number) {
    return await this.columnsRepository.findAllBy(dashboardId);
  }

  async swapColumnsPosition(dashboardId: number, swapColumnsDto: SwapColumnPositionDto) {
    const { from, to } = swapColumnsDto;
    return await this.columnsRepository.swapColumnsPosition(dashboardId, from, to);
  }

  async updateOneBy(columnId: number, columnDto: UpdateColumnsDto) {
    const existingColumn = await this.columnsRepository.findOneBy(columnId);
    if (!existingColumn) {
      throw EntityNotFoundException(`Column with id ${columnId} not found`);
    }

    const updateColumn: Partial<Column> = {
      ...columnDto,
    };

    return await this.columnsRepository.updateOneBy(columnId, updateColumn);
  }

  async deleteOneAndReorder(dashboardId: number, columnId: number) {
    return await this.columnsRepository.deleteOneAndReorder(dashboardId, columnId);
  }
}
