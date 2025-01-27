import { Provider } from '@nestjs/common';
import { Column, ColumnEntity } from '../columns.entity';
import { ColumnsRepositoryImpl } from './columns.repositoryImpl';

export interface ColumnsRepository {
  create(column: Column): Promise<ColumnEntity>;
  findAllBy(dashboardId: number): Promise<ColumnEntity[]>;
  findOneBy(columnId: number): Promise<ColumnEntity | null>;
  updateOneBy(columnId: number, column: Partial<Column>): Promise<ColumnEntity>;
  deleteOneBy(columnId: number): Promise<ColumnEntity>;
  swapColumnsPosition(dashboardId: number, from: number, to: number): Promise<ColumnEntity[]>;
  deleteOneAndReorder(dashboardId: number, columnId: number): Promise<ColumnEntity>;
}

export const ColumnsRepositoryToken = Symbol('ColumnsRepositoryToken');

export const ColumnsRepositoryProvider: Provider<ColumnsRepository> = {
  provide: ColumnsRepositoryToken,
  useClass: ColumnsRepositoryImpl,
};
