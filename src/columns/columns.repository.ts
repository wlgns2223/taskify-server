import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Column } from './columns.model';

@Injectable()
export class ColumnsRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
        id,name,position,dashboard_id as dashboardId, created_at as createdAt, updated_at as updatedAt 
        FROM columns 
        WHERE id = ?`;

    const result = await this.dbService.select(query, [id]);
    return result;
  }

  async createColumn(column: Column) {
    const query = `INSERT INTO columns (name, position, dashboard_id) VALUES (?, ?, ?)`;
    const result = await this.dbService.insert(query, [column.name, column.position, column.dashboardId]);
    const insertedColumn = await this.getData(result.insertId);

    return insertedColumn[0];
  }
}
