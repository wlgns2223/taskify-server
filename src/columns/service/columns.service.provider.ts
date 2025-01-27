import { Provider } from '@nestjs/common';
import { Column, ColumnEntity } from '../columns.entity';
import { CreateColumnsDto } from '../dto/createColumns.dto';
import { SwapColumnPositionDto } from '../dto/swapColumnPosition.dto';
import { ColumnsServiceImpl } from './columns.serviceImpl';

export interface ColumnsService {
  create(createColumnDTO: CreateColumnsDto): Promise<ColumnEntity>;
  findAllBy(dashboardId: number): Promise<ColumnEntity[]>;
  swapColumnsPosition(dashboardId: number, swapColumnsDto: SwapColumnPositionDto): Promise<ColumnEntity[]>;
  updateOneBy(columnId: number, column: Partial<Column>): Promise<ColumnEntity>;
  deleteOneAndReorder(dashboardId: number, columnId: number): Promise<ColumnEntity>;
}

export const ColumnsServiceToken = Symbol('ColumnsServiceToken');

export const ColumnsServiceProvider: Provider<ColumnsService> = {
  provide: ColumnsServiceToken,
  useClass: ColumnsServiceImpl,
};
