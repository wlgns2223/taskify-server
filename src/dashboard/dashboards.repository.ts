import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Dashboard } from './dashboards.model';
import { OffsetPaginationRequestDto } from './dto/offsetPagination.dto';

export type CursorPaginationDirection = 'prev' | 'next';

@Injectable()
export class DashboardsRepository {
  private logger = new Logger(DashboardsRepository.name);
  constructor(private dbService: DBConnectionService) {}

  private async getData<T>(id: number) {
    const query = `SELECT 
    id,title,color,owner_id as ownerId, created_at as createdAt, updated_at as updatedAt 
    FROM dashboards 
    WHERE id = ?`;

    const result = await this.dbService.select<T>(query, [id]);
    return result;
  }

  async createDashboard(dashBoard: Dashboard) {
    const query = `INSERT INTO dashboards (title, color, owner_id) VALUES (?, ?, ?)`;
    const result = await this.dbService.insert(query, [dashBoard.title, dashBoard.color, dashBoard.ownerId]);
    const insertedDashboard = await this.getData<Dashboard>(result.insertId);

    return insertedDashboard[0];
  }

  async getFirstLastCursor() {
    const firstCursorQuery = `SELECT id FROM dashboards ORDER BY id ASC LIMIT 1`;
    const lastCursorQuery = `SELECT id FROM dashboards ORDER BY id DESC LIMIT 1`;
    const firstCursor = await this.dbService.select<{ id: number }>(firstCursorQuery);
    const lastCursor = await this.dbService.select<{ id: number }>(lastCursorQuery);
    return {
      firstCursor: firstCursor.length ? firstCursor[0].id : null,
      lastCursor: lastCursor.length ? lastCursor[0].id : null,
    };
  }

  async getTotalNumberOfDashboards(userId: number) {
    const query = `
    SELECT 
    COUNT(*) as total
    FROM members as M
    JOIN dashboards as D ON D.id = M.dashboard_id
    where M.member_id = ?
    `;
    const result = await this.dbService.select<{ total: number }>(query, [userId]);
    return result[0].total;
  }

  async getDashboards(offsetPaginationParam: {
    offsetPaginationRequestDto: OffsetPaginationRequestDto;
    userId: number;
  }) {
    const {
      offsetPaginationRequestDto: { page, pageSize },
      userId,
    } = offsetPaginationParam;
    const query = `
    SELECT 
    D.id as id,
    D.title,
    D.color,
    D.owner_id as ownerId,
    D.created_at as createdAt,
    D.updated_at as updatedAt
    FROM members as M
    JOIN dashboards as D ON D.id = M.dashboard_id
    WHERE M.member_id = ${userId}
    ORDER BY D.id DESC
    LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
  `;

    const result = await this.dbService.select<Dashboard>(query);

    return result;
  }

  async getDashboardById(id: number) {
    const query = `
    SELECT 
    id,title,color,owner_id as ownerId, created_at as createdAt, updated_at as updatedAt 
    FROM dashboards 
    WHERE id = ?
  `;
    const result = await this.dbService.select<Dashboard>(query, [id]);
    return result[0];
  }
}
