import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Dashboard } from './dashboards.model';

export type CursorPaginationDirection = 'prev' | 'next';

@Injectable()
export class DashboardsRepository {
  private logger = new Logger(DashboardsRepository.name);
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
    id,title,color,owner_id as ownerId, created_at as createdAt, updated_at as updatedAt 
    FROM dashboards 
    WHERE id = ?`;

    const result = await this.dbService.select(query, [id]);
    return result;
  }

  async createDashboard(dashBoard: Dashboard) {
    const query = `INSERT INTO dashboards (title, color, owner_id) VALUES (?, ?, ?)`;
    const result = await this.dbService.insert(query, [dashBoard.title, dashBoard.color, dashBoard.ownerId]);
    const insertedDashboard = await this.getData(result.insertId);

    return insertedDashboard[0];
  }

  async getDashboards(cursor: string, limit: string, direction: CursorPaginationDirection) {
    const baseQuery = `
    SELECT id,title,color,owner_id as ownerId, created_at as createdAt, updated_at as updatedAt 
    FROM dashboards
    WHERE id ${direction === 'next' ? '>' : '<'} ?
    ORDER BY id ${direction === 'next' ? 'ASC' : 'DESC'}
    LIMIT ?
    `;

    const query = direction === 'prev' ? `SELECT * FROM (${baseQuery}) AS subquery ORDER BY id ASC` : baseQuery;

    const result = await this.dbService.select<Dashboard>(query, [cursor, limit]);

    return result;
  }
}
