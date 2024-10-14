import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Dashboard } from './dashboards.model';

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
}
