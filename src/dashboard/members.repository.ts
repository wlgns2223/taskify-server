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
}
