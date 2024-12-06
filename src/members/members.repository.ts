import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Member } from './members.model';

@Injectable()
export class MembersRepository {
  constructor(private dbService: DBConnectionService) {}

  async createMember(member: Member) {
    const query = `INSERT INTO members (dashboard_id, member_id) VALUES (?, ?)`;
    await this.dbService.insert(query, [member.dashboardId, member.memberId]);
  }

  async getMembersByDashboardId(dashboardId: number) {
    const query = `
    SELECT
      M.id,
      M.dashboard_id as dashboardId,
      M.member_id as memberId,
      U.nickname,
      M.created_at as createdAt
    FROM members as M
    JOIN users as U ON M.member_id = U.id 
    WHERE dashboard_id = ?`;
    return await this.dbService.select(query, [dashboardId]);
  }
}
