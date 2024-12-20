import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Invitation, InvitationStatus } from './invitations.model';
import { OffsetPaginationRequestDto } from '../dashboard/dto/offsetPagination.dto';
import { InvitationOffsetPaginationWithSearchRequestDto } from './dto/readhInvitation.dto';
import { InvitationDto } from './dto/invitation.dto';

@Injectable()
export class InvitationsRepository {
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

    const result = await this.dbService.select(query, [id]);
    return result;
  }

  async createInvitation(newInvitation: Invitation) {
    const query = `
    insert into invitations (inviter_id, dashboard_id, invitee_email)
    values (?, ?, ?)
    `;
    const result = await this.dbService.insert(query, [
      newInvitation.inviterId,
      newInvitation.dashboardId,
      newInvitation.inviteeEmail,
    ]);
    const insertedInvitation = await this.getData(result.insertId);

    return insertedInvitation[0];
  }

  async getTotalNumberOfInvitations(email: string) {
    const query = `
    SELECT COUNT(*) as total
    FROM invitations
    WHERE invitee_email = ?;
    `;
    const result = await this.dbService.select<{ total: number }>(query, [email]);
    return result[0].total;
  }

  async getInvitationsByEmailWithPagination(
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
    I.created_at as createdAt
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

    const result = await this.dbService.select<InvitationDto>(query, param);
    return result;
  }

  async updateInvitationStatus(id: number, status: InvitationStatus) {
    const query = `UPDATE invitations SET status = ? WHERE id = ?`;
    await this.dbService.update(query, [status, id]);
    const updatedInvitation = await this.getData(id);
    return updatedInvitation[0];
  }
}
