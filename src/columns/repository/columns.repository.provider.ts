import { Column, ColumnEntity } from '../columns.entity';

export interface ColumnsRepository {
  create(column: Column): Promise<ColumnEntity>;
  findAllBy(dashboardId: number): Promise<ColumnEntity[]>;
  findOneBy(columnId: number): Promise<ColumnEntity>;
  updateOneBy(columnId: number, column: Column): Promise<ColumnEntity>;
  deleteOneBy(columnId: number): Promise<ColumnEntity>;
  swapColumnsPosition(dashboardId: number, from: number, to: number): Promise<ColumnEntity[]>;
  deleteOneAndReorder(dashboardId: number, columnId: number): Promise<ColumnEntity>;
}
