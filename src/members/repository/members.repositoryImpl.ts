import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { Member, MemberEntity } from '../members.entity';
import { MembersRepository } from './member.repository.provider';
import { MembersMapper } from '../members.mapper';

@Injectable()
export class MembersRepositoryImpl implements MembersRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
        id, 
        dashboard_id as dashboardId,
        member_id as memberId,
        created_at as createdAt,
        updated_at as updatedAt 
        FROM members 
        WHERE id = ?`;

    const result = await this.dbService.select<Member>(query, [id]);
    return result;
  }

  async create(member: Member) {
    const query = `INSERT INTO members (dashboard_id, member_id) VALUES (?, ?)`;
    const result = await this.dbService.mutate(query, [member.dashboardId, member.memberId]);
    const insertedMember = await this.getData(result.insertId);
    return MembersMapper.toEntity(insertedMember[0]);
  }

  async findAllBy(dashboardId: number) {
    const query = `
    SELECT
      M.id,
      M.dashboard_id as dashboardId,
      M.member_id as memberId,
      U.nickname,
      M.created_at as createdAt,
      M.updated_at as updatedAt
    FROM members as M
    JOIN users as U ON M.member_id = U.id 
    WHERE dashboard_id = ?`;
    const results = await this.dbService.select<Member>(query, [dashboardId]);
    return MembersMapper.toEntityList(results);
  }
}
