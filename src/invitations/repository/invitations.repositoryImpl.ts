import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { InvitationOffsetPaginationWithSearchRequestDto } from '../dto/readhInvitation.dto';
import { Invitation, InvitationStatus } from '../invitations.entity';
import { InvitationsRepository } from './invitations.repository.provider';
import { InvitationsMapper } from '../invitations.mapper';

@Injectable()
export class InvitationsRepositoryImpl implements InvitationsRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT
    id,
    invitee_email as inviteeEmail,
    inviter_id as inviterId,
    dashboard_id as dashboardId,
    status,
    created_at as createdAt,
    updated_at as updatedAt
    FROM invitations
    WHERE id = ?`;

    const result = await this.dbService.select<Invitation>(query, [id]);
    return result;
  }

  async create(newInvitation: Invitation) {
    const query = `
    insert into invitations (inviter_id, dashboard_id, invitee_email)
    values (?, ?, ?)
    `;
    const result = await this.dbService.mutate(query, [
      newInvitation.inviterId,
      newInvitation.dashboardId,
      newInvitation.inviteeEmail,
    ]);
    const insertedInvitation = await this.getData(result.insertId);

    return InvitationsMapper.toEntity(insertedInvitation[0]);
  }

  async countAllBy(email: string) {
    const query = `
    SELECT COUNT(*) as total
    FROM invitations
    WHERE status='pending' and invitee_email = ?;
    `;
    const result = await this.dbService.select<{ total: number }>(query, [email]);
    return result[0].total;
  }

  async findAllByWithPagination(
    offsetPaginationRequestDto: InvitationOffsetPaginationWithSearchRequestDto,
    email: string,
  ) {
    const { page, pageSize, search } = offsetPaginationRequestDto;
    const param = [email];
    let query = `
    SELECT 
    I.id as id,
    D.title as dashboardTitle,
    U.nickname as inviterNickname,
    I.status,
    I.invitee_email as inviteeEmail,
    I.inviter_id as inviterId,
    I.created_at as createdAt
    I.updated_at as updatedAt
    FROM invitations AS I
    JOIN dashboards AS D ON D.id = I.dashboard_id
    JOIN users AS U ON U.id = I.inviter_id
    WHERE I.status = "pending" AND I.invitee_email = ?
    `;

    if (search) {
      query += ` AND D.title LIKE ?`;
      param.push(`%${search}%`);
    }

    const offsetQuery = `
    ORDER BY I.id DESC
    LIMIT ? OFFSET ?`;

    query += offsetQuery;
    const offset = (page - 1) * pageSize;
    param.push(pageSize.toString(), offset.toString());

    const result = await this.dbService.select<Invitation>(query, param);
    return InvitationsMapper.toEntityList(result);
  }

  async updateOneBy(id: number, status: InvitationStatus) {
    const query = `UPDATE invitations SET status = ? WHERE id = ?`;
    await this.dbService.mutate(query, [status, id]);
    const updatedInvitation = await this.getData(id);
    return InvitationsMapper.toEntity(updatedInvitation[0]);
  }
}
