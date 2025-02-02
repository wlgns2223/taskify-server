import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { Dashboard } from '../dashboards.entity';
import { OffsetPaginationRequestDto } from '../dto/offsetPagination.dto';
import { DashboardsRepository } from './dashboards.repository.provider';
import { DashboardMapper } from '../dashboard.mapper';

export type CursorPaginationDirection = 'prev' | 'next';

@Injectable()
export class DashboardsRepositoryImpl implements DashboardsRepository {
  private logger = new Logger(DashboardsRepositoryImpl.name);
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
    id,title,color,owner_id as ownerId, created_at as createdAt, updated_at as updatedAt 
    FROM dashboards 
    WHERE id = ?`;

    const result = await this.dbService.select<Dashboard>(query, [id]);
    return result;
  }

  async create(dashBoard: Dashboard) {
    const query = `INSERT INTO dashboards (title, color, owner_id) VALUES (?, ?, ?)`;
    const result = await this.dbService.mutate(query, [dashBoard.title, dashBoard.color, dashBoard.ownerId]);
    const insertedDashboard = await this.getData(result.insertId);

    return DashboardMapper.toEntity(insertedDashboard[0]);
  }

  async countAllBy(userId: number) {
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

  async findAllByWithPagination(userId: number, offsetPaginationRequestDto: OffsetPaginationRequestDto) {
    const { page, pageSize } = offsetPaginationRequestDto;
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

    return DashboardMapper.toEntityList(result);
  }

  async findOneBy(id: number) {
    const query = `
    SELECT 
    id,title,color,owner_id as ownerId, created_at as createdAt, updated_at as updatedAt 
    FROM dashboards 
    WHERE id = ?
    limit 1
  `;
    const result = await this.dbService.select<Dashboard>(query, [id]);
    return DashboardMapper.toEntity(result[0]);
  }
}
