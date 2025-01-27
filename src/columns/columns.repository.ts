import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Column } from './columns.entity';
import { Dashboard } from '../dashboard/dashboards.entity';

@Injectable()
export class ColumnsRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
        id,name,position,dashboard_id as dashboardId, created_at as createdAt, updated_at as updatedAt 
        FROM columns 
        WHERE id = ?`;

    const result = await this.dbService.select<Dashboard>(query, [id]);
    return result;
  }

  async createColumn(column: Column) {
    const query = `INSERT INTO columns (name, position, dashboard_id) VALUES (?, ?, ?)`;
    const result = await this.dbService.insert(query, [column.name, column.position, column.dashboardId]);
    const insertedColumn = await this.getData(result.insertId);

    return insertedColumn[0];
  }

  async getColumnsByDashboardId(dashboardId: number) {
    const query = `SELECT 
        id,name,position,dashboard_id as dashboardId, created_at as createdAt, updated_at as updatedAt 
        FROM columns 
        WHERE dashboard_id = ?
        ORDER BY position ASC
        `;

    const result = await this.dbService.select(query, [dashboardId]);
    return result;
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
      const columns = await this.getColumnsByDashboardId(dashboardId);
      return columns;
    };

    return await this.dbService.transaction(queries);
  }

  async updateColumn(columnId: string, newColumn: Column) {
    const query = `UPDATE columns SET name = ? WHERE id = ?`;
    await this.dbService.update(query, [newColumn.name, columnId]);
    const updatedColumn = await this.getData(newColumn.id);

    return updatedColumn[0];
  }

  async deleteColumn(columnId: number) {
    const query = `DELETE FROM columns WHERE id = ?`;
    await this.dbService.delete(query, [columnId]);
  }

  async reorderColumns(dashboardId: number, position: number) {
    const updateQuery = `
      UPDATE columns
      SET position = position - 1
      WHERE dashboard_id = ? AND position > ?
    `;
    await this.dbService.update(updateQuery, [dashboardId, position]);
  }

  async deleteAndReorderColumns(dashboardId: number, columnId: number) {
    const quries = async () => {
      const column = await this.getData(columnId);
      await this.deleteColumn(columnId);
      await this.reorderColumns(dashboardId, column[0].position);
    };
    return await this.dbService.transaction(quries);
  }
}
