import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { Column } from '../columns.entity';
import { ColumnsRepository } from './columns.repository.provider';
import { ColumnsMapper } from '../columns.mapper';
import { InternalServerException } from '../../common/exceptions/exceptions';

@Injectable()
export class ColumnsRepositoryImpl implements ColumnsRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
        id,name,position,dashboard_id as dashboardId, created_at as createdAt, updated_at as updatedAt 
        FROM columns 
        WHERE id = ?`;

    const result = await this.dbService.select<Column>(query, [id]);

    return result;
  }

  private async moveBackwardOrderOfColumnsOf(dashboardId: number) {
    const query = `UPDATE columns SET position = position + 1 WHERE dashboard_id =  ?`;
    await this.dbService.update(query, [dashboardId]);
  }

  async create(column: Column) {
    const queries = async () => {
      await this.moveBackwardOrderOfColumnsOf(column.dashboardId);
      const query = `INSERT INTO columns (name, position, dashboard_id) VALUES (?, ?, ?)`;
      const result = await this.dbService.insert(query, [column.name, column.position, column.dashboardId]);
      return result;
    };

    const result = await this.dbService.transaction(queries);

    const insertedColumn = await this.getData(result.insertId);

    return ColumnsMapper.toEntity(insertedColumn[0]);
  }

  async findOneBy(columnId: number) {
    const column = await this.getData(columnId);
    return ColumnsMapper.toEntity(column[0]);
  }

  async findAllBy(dashboardId: number) {
    const query = `SELECT 
        id,name,position,dashboard_id as dashboardId, created_at as createdAt, updated_at as updatedAt 
        FROM columns 
        WHERE dashboard_id = ?
        ORDER BY position ASC
        `;

    const result = await this.dbService.select(query, [dashboardId]);
    return ColumnsMapper.toEntityList(result);
  }

  async swapColumnsPosition(dashboardId: number, from: number, to: number) {
    const tempPosition = 4294967295;
    const query1 = `
      update columns
      set position = ?
      where position = ? and dashboard_id = ?;
    `;
    const query2 = `
      update columns
      set position = ?
      where position = ? and dashboard_id = ?;
    `;
    const query3 = `
      update columns
      set position = ?
      where position = ? and dashboard_id = ?;
    `;

    const queries = async () => {
      await this.dbService.update(query1, [tempPosition, from, dashboardId]);
      await this.dbService.update(query2, [from, to, dashboardId]);
      await this.dbService.update(query3, [to, tempPosition, dashboardId]);
      const columns = await this.findAllBy(dashboardId);
      return columns;
    };

    return await this.dbService.transaction(queries);
  }

  async updateOneBy(columnId: number, newColumn: Partial<Column>) {
    let query = `UPDATE columns SET `;

    const keys: (string | number)[] = [];
    Object.keys(newColumn).forEach((key) => {
      keys.push(newColumn[key]);
      query += `${key} = ?,`;
    });
    query = query.slice(0, -1);
    query += ` WHERE id = ?`;
    keys.push(columnId);

    await this.dbService.update(query, keys);
    const updatedColumn = await this.getData(columnId);

    return ColumnsMapper.toEntity(updatedColumn[0]);
  }

  async deleteOneBy(columnId: number) {
    const query = `DELETE FROM columns WHERE id = ?`;
    const queries = async () => {
      const column = await this.getData(columnId);
      await this.dbService.delete(query, [columnId]);
      return ColumnsMapper.toEntity(column[0]);
    };

    return await this.dbService.transaction(queries);
  }

  async reorderColumns(dashboardId: number, position: number) {
    const updateQuery = `
      UPDATE columns
      SET position = position - 1
      WHERE dashboard_id = ? AND position > ?
    `;
    await this.dbService.update(updateQuery, [dashboardId, position]);
  }

  async deleteOneAndReorder(dashboardId: number, columnId: number) {
    const quries = async () => {
      const column = await this.deleteOneBy(columnId);
      if (column.position === undefined) {
        throw InternalServerException('Column position is not defined');
      }

      await this.reorderColumns(dashboardId, column.position);
      return column;
    };
    return await this.dbService.transaction(quries);
  }
}
